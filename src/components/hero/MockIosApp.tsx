import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "../../data/profile";

// Xcode-style code editor mock. A single recursive setTimeout drives typing;
// the caret blink is pure CSS. Tokenization runs exactly ONCE via useMemo.
// Per render: O(log n) binary search over token end-offsets + one partial-
// token text slice. Auto-scroll only on newline crossings.

// Build the Swift snippet at module scope so updates to profile re-flow.
const CODE = `import SwiftUI

struct Developer {
    let name = "${profile.shortName}"
    let role = "${profile.title}"
    let location = "${profile.location}"
    let yearsOfExperience = ${profile.yearsOfExperience}

    let languages = [
        "Swift", "Dart",
        "TypeScript", "Python"
    ]

    let stack = [
        "SwiftUI", "UIKit",
        "Flutter", "Firebase",
        "Combine", "Bloc"
    ]

    let contact = Contact(
        email: "${profile.email}",
        github: "ram7767"
    )

    var currentFocus: String {
        "Shipping polished, performant mobile apps"
    }
}
`;

// Typing pacing — uniform rhythm. Every character emits at the same
// interval so the typer reads as one continuous, deliberate stream
// (no per-char pauses or "stutters" around punctuation/newlines).
const TICK_MS = 40; // ~25 chars/sec — fast, continuous feel
const HOLD_AFTER_COMPLETE_MS = 2500;

// Count newlines in CODE[0..end). Used to detect line-crossings for autoscroll.
function newlinesUpTo(end: number): number {
  let n = 0;
  for (let i = 0; i < end; i++) if (CODE[i] === "\n") n++;
  return n;
}

// --- Token classes — Xcode-Pro feeling (warm + muted). ---
const TOKEN_CLASS = {
  keyword: "text-amber-300",
  type: "text-teal-300",
  string: "text-violet-300",
  number: "text-orange-300",
  comment: "text-ink-400 italic",
  punct: "text-ink-300",
  ident: "text-ink-100",
  plain: "text-ink-100",
} as const;

type TokenKind = keyof typeof TOKEN_CLASS;
type Token = { text: string; kind: TokenKind };

const KEYWORDS = new Set([
  "import",
  "struct",
  "class",
  "let",
  "var",
  "func",
  "return",
  "if",
  "else",
  "true",
  "false",
  "nil",
  "self",
  "in",
]);

const BUILTIN_TYPES = new Set([
  "String",
  "Int",
  "Double",
  "Bool",
  "Void",
  "SwiftUI",
  "Foundation",
]);

// Pre-tokenize the full code ONCE. Per-character render slices this token
// stream by accumulated length, so we never re-parse during typing.
function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  const len = src.length;

  while (i < len) {
    const ch = src[i];

    // Line comment
    if (ch === "/" && src[i + 1] === "/") {
      let j = i;
      while (j < len && src[j] !== "\n") j++;
      out.push({ text: src.slice(i, j), kind: "comment" });
      i = j;
      continue;
    }

    // String literal
    if (ch === '"') {
      let j = i + 1;
      while (j < len && src[j] !== '"') {
        if (src[j] === "\\" && j + 1 < len) j += 2;
        else j++;
      }
      if (j < len) j++; // closing quote
      out.push({ text: src.slice(i, j), kind: "string" });
      i = j;
      continue;
    }

    // Number
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < len && /[0-9_.]/.test(src[j])) j++;
      out.push({ text: src.slice(i, j), kind: "number" });
      i = j;
      continue;
    }

    // Identifier / keyword / type
    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < len && /[A-Za-z0-9_]/.test(src[j])) j++;
      const word = src.slice(i, j);
      let kind: TokenKind;
      if (KEYWORDS.has(word)) kind = "keyword";
      else if (BUILTIN_TYPES.has(word) || /^[A-Z]/.test(word)) kind = "type";
      else kind = "ident";
      out.push({ text: word, kind });
      i = j;
      continue;
    }

    // Whitespace (preserve as plain to keep indentation)
    if (ch === " " || ch === "\t" || ch === "\n") {
      let j = i;
      while (j < len && (src[j] === " " || src[j] === "\t" || src[j] === "\n")) j++;
      out.push({ text: src.slice(i, j), kind: "plain" });
      i = j;
      continue;
    }

    // Punctuation / everything else — chunk runs of the same category.
    let j = i;
    while (
      j < len &&
      !/[A-Za-z0-9_"\s]/.test(src[j]) &&
      !(src[j] === "/" && src[j + 1] === "/")
    ) {
      j++;
    }
    out.push({ text: src.slice(i, j), kind: "punct" });
    i = j;
  }

  return out;
}

// Flatten tokens by splitting on newlines so each token is single-line.
// This makes per-render slicing trivial: we just group rendered tokens by
// the running line counter, no per-tick re-splitting.
type FlatToken = { text: string; kind: TokenKind; line: number };

function flattenTokens(tokens: Token[]): { flat: FlatToken[]; lineCount: number } {
  const flat: FlatToken[] = [];
  let line = 0;
  for (const tok of tokens) {
    const parts = tok.text.split("\n");
    parts.forEach((part, idx) => {
      if (idx > 0) line++;
      if (part.length > 0) flat.push({ text: part, kind: tok.kind, line });
    });
  }
  return { flat, lineCount: line + 1 };
}

// Build cumulative end-offsets into the original CODE for each flat token.
// Newlines (skipped from `flat`) are accounted for between line boundaries.
function buildTokenEnds(flat: FlatToken[]): number[] {
  const ends: number[] = new Array(flat.length);
  let offset = 0;
  let line = 0;
  for (let i = 0; i < flat.length; i++) {
    const t = flat[i];
    while (line < t.line) {
      offset += 1;
      line++;
    }
    offset += t.text.length;
    ends[i] = offset;
  }
  return ends;
}

// Binary search: smallest index i such that tokenEnds[i] >= chars. Returns
// flat.length if chars exceeds the last end (everything fully shown).
function findPartialIndex(tokenEnds: number[], chars: number): number {
  let lo = 0;
  let hi = tokenEnds.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (tokenEnds[mid] < chars) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export default function MockIosApp() {
  // Tokenize the FULL code exactly once.
  const { flat, lineCount, tokenEnds } = useMemo(() => {
    const tokens = tokenize(CODE);
    const { flat, lineCount } = flattenTokens(tokens);
    const tokenEnds = buildTokenEnds(flat);
    return { flat, lineCount, tokenEnds };
  }, []);
  const totalChars = CODE.length;

  const [reducedMotion, setReducedMotion] = useState(false);
  const [typed, setTyped] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  // Tracks last newline-count we autoscrolled at, so we only write scrollTop
  // when typing actually crosses into a new line (not every tick).
  const lastLineRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) setTyped(totalChars);
  }, [totalChars]);

  useEffect(() => {
    if (reducedMotion) return;

    const tick = () => {
      setTyped((prev) => {
        if (prev >= totalChars) {
          // Hold at end-of-code, then restart from 0 with the same cadence.
          timerRef.current = window.setTimeout(() => {
            lastLineRef.current = 0;
            setTyped(0);
            timerRef.current = window.setTimeout(tick, TICK_MS);
          }, HOLD_AFTER_COMPLETE_MS);
          return prev;
        }
        const next = Math.min(totalChars, prev + 1);
        timerRef.current = window.setTimeout(tick, TICK_MS);
        return next;
      });
    };

    timerRef.current = window.setTimeout(tick, TICK_MS);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [reducedMotion, totalChars]);

  // Auto-scroll only when typing crosses a newline boundary.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const currentLine = newlinesUpTo(typed);
    if (currentLine !== lastLineRef.current) {
      lastLineRef.current = currentLine;
      el.scrollTop = el.scrollHeight;
    }
  }, [typed]);

  // Visible token slice: O(log n) binary search + one partial slice.
  const { fullTokens, partialToken } = useMemo(() => {
    if (typed >= totalChars) {
      return { fullTokens: flat, partialToken: null as FlatToken | null };
    }
    const partialIdx = findPartialIndex(tokenEnds, typed);
    if (partialIdx >= flat.length) {
      return { fullTokens: flat, partialToken: null as FlatToken | null };
    }
    const prevEnd = partialIdx === 0 ? 0 : tokenEnds[partialIdx - 1];
    const remaining = typed - prevEnd;
    const tok = flat[partialIdx];
    if (remaining <= 0) {
      return {
        fullTokens: flat.slice(0, partialIdx),
        partialToken: null as FlatToken | null,
      };
    }
    return {
      fullTokens: flat.slice(0, partialIdx),
      partialToken: {
        text: tok.text.slice(0, remaining),
        kind: tok.kind,
        line: tok.line,
      } as FlatToken,
    };
  }, [flat, tokenEnds, typed, totalChars]);

  const totalLineCount = lineCount;
  const caretOnFinalLine = !reducedMotion && typed < totalChars;

  // Determine which line the caret should appear on.
  let caretLine: number;
  if (partialToken) {
    caretLine = partialToken.line;
  } else if (fullTokens.length > 0) {
    caretLine = fullTokens[fullTokens.length - 1].line;
  } else {
    caretLine = 0;
  }

  return (
    <div
      aria-hidden="true"
      className="relative w-full h-full bg-[#1c1b22] text-ink-100 font-sans flex flex-col select-none overflow-hidden"
    >
      {/* Scoped CSS — caret blink only. Softened: eased fade between
          opacity 0.15 and 1 over 1.2s, never fully invisible. */}
      <style>{`
        @keyframes mock_caret_blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        .mock-caret {
          display: inline-block;
          width: 0.55em;
          height: 1em;
          vertical-align: -0.15em;
          /* amber-300 @ 70% — matches keyword warmth. */
          background-color: rgba(252, 211, 77, 0.7);
          margin-left: 1px;
          border-radius: 1px;
          animation: mock_caret_blink 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* Title bar — traffic lights + breadcrumb. */}
      <div className="flex items-center px-2 md:px-3 h-6 md:h-7 bg-ink-800 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-1 md:gap-1.5">
          <span className="block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500/90" />
          <span className="block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500/90" />
          <span className="block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500/90" />
        </div>
        <div className="hidden md:flex flex-1 justify-center text-[10px] md:text-[11px] text-ink-300 font-mono tracking-tight">
          Developer.swift
        </div>
        <div className="flex-1 md:hidden" />
      </div>

      {/* Body — gutter + code + minimap. */}
      <div className="flex flex-1 min-h-0">
        {/* Line-number gutter */}
        <div className="w-7 md:w-9 shrink-0 border-r border-white/5 bg-[#17161c] font-mono text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs text-ink-400/40 leading-relaxed text-right pr-1.5 md:pr-2 pt-2 pb-2 overflow-hidden">
          {Array.from({ length: totalLineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code scroll area — promoted to its own compositor layer so the
            surrounding parallax doesn't trigger repaints inside the editor. */}
        <div
          ref={scrollRef}
          className="flex-1 min-w-0 overflow-hidden font-mono text-[10px] sm:text-[11px] md:text-[13px] lg:text-sm leading-relaxed pt-2 pb-2 pl-2 md:pl-3 pr-1"
          style={{ willChange: "contents", transform: "translateZ(0)" }}
        >
          {Array.from({ length: totalLineCount }, (_, li) => {
            const lineFulls = fullTokens.filter((t) => t.line === li);
            const lineHasPartial = partialToken !== null && partialToken.line === li;
            const isCaretLine = caretOnFinalLine && li === caretLine;
            const isEmpty = lineFulls.length === 0 && !lineHasPartial && !isCaretLine;
            return (
              <div key={li} className="whitespace-pre">
                {lineFulls.map((tok, ti) => (
                  <span key={ti} className={TOKEN_CLASS[tok.kind]}>
                    {tok.text}
                  </span>
                ))}
                {lineHasPartial && partialToken && (
                  <span className={TOKEN_CLASS[partialToken.kind]}>
                    {partialToken.text}
                  </span>
                )}
                {isCaretLine && <span className="mock-caret" />}
                {isEmpty && " "}
              </div>
            );
          })}
        </div>

        {/* Minimap strip — faint structural dashes (hidden on narrow). */}
        <div className="hidden sm:flex flex-col gap-[1px] w-1 md:w-1.5 shrink-0 border-l border-white/5 py-2 pl-[2px] pr-[1px] opacity-50">
          {Array.from({ length: totalLineCount }, (_, i) => {
            const lineLen = flat.reduce(
              (s, t) => (t.line === i ? s + t.text.length : s),
              0
            );
            const widthPct = Math.min(100, Math.max(10, (lineLen / 36) * 100));
            return (
              <div
                key={i}
                className="bg-ink-400/40 rounded-sm"
                style={{ height: "2px", width: `${widthPct}%` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
