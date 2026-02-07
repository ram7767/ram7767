import { useMemo } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number) => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Parse r, g, b values
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Custom hook to access theme values
export const useTheme = () => {
  const { data, loading, error } = usePortfolio();

  const theme = useMemo(() => {
    if (!data?.theme) {
      // Return defaults if theme data isn't loaded
      return {
        primaryBg: '#0a192f',
        secondaryBg: '#112240',
        cardBg: '#172a46',
        accentPurple: '#8b5cf6',
        accentLightPurple: '#a78bfa',
        textPrimary: '#8b5cf6',
        textSecondary: '#8892b0',
        highlight: '#64ffda',
      };
    }

    return data.theme;
  }, [data?.theme]);

  // Add helper methods to theme
  const themeWithHelpers = {
    ...theme,
    getRgba: (colorName: keyof typeof theme, alpha: number) => {
      const colorValue = theme[colorName];
      return hexToRgba(colorValue as string, alpha);
    }
  };

  return { theme: themeWithHelpers, loading, error };
};