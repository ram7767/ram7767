import { useState, useEffect } from 'react';
import type { GitHubContribution } from '@/types';

interface UseGitHubContributionsReturn {
  contributions: GitHubContribution[];
  loading: boolean;
  error: string | null;
  totalContributions: number;
  streak: number;
}

export const useGitHubContributions = (username: string | undefined): UseGitHubContributionsReturn => {
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalContributions, setTotalContributions] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchContributions = async () => {
      try {
        // Using GitHub's GraphQL API requires a token, so we'll use a fallback approach
        // For demo purposes, we'll generate realistic mock data based on the username
        const mockData = generateMockContributions(username);
        setContributions(mockData.contributions);
        setTotalContributions(mockData.total);
        setStreak(mockData.streak);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contributions');
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  return { contributions, loading, error, totalContributions, streak };
};

// Generate realistic mock contributions for demo
function generateMockContributions(username: string): {
  contributions: GitHubContribution[];
  total: number;
  streak: number;
} {
  const contributions: GitHubContribution[] = [];
  const today = new Date();
  let total = 0;
  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 0;

  // Generate data for the last year (365 days)
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate random contribution count with realistic patterns
    // Weekdays have more contributions, weekends less
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Use username to seed random for consistency
    const seed = username.length + i;
    const random = Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000);
    
    let count = 0;
    if (random > 0.3) {
      count = Math.floor(random * (isWeekend ? 5 : 12));
    }
    
    // Determine level based on count
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0) level = 1;
    if (count >= 3) level = 2;
    if (count >= 6) level = 3;
    if (count >= 10) level = 4;

    contributions.push({
      date: date.toISOString().split('T')[0],
      count,
      level,
    });

    total += count;

    // Calculate streak
    if (count > 0) {
      tempStreak++;
      if (i <= 7) {
        currentStreak = tempStreak;
      }
    } else {
      if (i > 7) {
        maxStreak = Math.max(maxStreak, tempStreak);
      }
      tempStreak = 0;
    }
  }

  maxStreak = Math.max(maxStreak, tempStreak);

  return {
    contributions,
    total,
    streak: currentStreak || maxStreak,
  };
}
