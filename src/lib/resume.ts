// Resume lives on Google Drive (public file).
// File ID: 1s-_-UfTo5GmwtWnjcwbDhEqcheeQ1MWU
// We construct Drive's direct-download URL, then trigger a click on a temporary
// anchor with the `download` attribute so the browser saves the file using our
// preferred filename instead of Drive's display name.
export const RESUME_FILE_ID = "1s-_-UfTo5GmwtWnjcwbDhEqcheeQ1MWU";
export const RESUME_FILENAME = "ratnakaram_rama_narasimha_raju.pdf";
export const RESUME_FOLDER_URL =
  "https://drive.google.com/drive/folders/117SpXICy5tnkvAAUPRzlOoGvQuDpPPy6";
export const RESUME_DIRECT_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;

export function downloadResume(): void {
  // Browsers ignore `download` for cross-origin URLs, so this will still open
  // Drive's download flow in a new tab — that's fine, the file streams down.
  const a = document.createElement("a");
  a.href = RESUME_DIRECT_URL;
  a.download = RESUME_FILENAME;
  a.target = "_blank";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
