"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ThemeType = 'dark' | 'purple';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("purple");
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeType;
    const defaultTheme = savedTheme || 'dark';
    
    setThemeState(defaultTheme);
    setMounted(true);
  }, []);

  // Update DOM whenever theme changes
  useEffect(() => {
    if (!mounted) return;
    
    const html = document.documentElement;
    
    // Remove all theme classes
    html.classList.remove('dark', 'purple');
    
    // Add current theme class
    html.classList.add(theme);
    
    // Set color scheme for system integration
    if (theme === 'dark') {
      html.style.colorScheme = "dark";
    } else {
      html.style.colorScheme = "light";
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}