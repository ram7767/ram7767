import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { PortfolioData } from '@/types';

interface PortfolioContextType {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<PortfolioContextType>({
  data: null,
  loading: true,
  error: null,
});

export const usePortfolio = () => useContext(PortfolioContext);

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use relative path for GitHub Pages compatibility
        const response = await fetch('./data/portfolioData.json');
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        const jsonData: PortfolioData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};
