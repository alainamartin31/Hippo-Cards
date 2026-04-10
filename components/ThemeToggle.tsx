"use client";

import { useTheme, ThemeType } from "@/lib/ThemeContext";
import { useEffect, useState } from "react";

const themes: { value: ThemeType; label: string; icon: string; color: string }[] = [
  { value: 'dark', label: 'Dark', icon: '🌙', color: 'bg-gray-800 text-gray-100' },
  { value: 'purple', label: 'Light Mode', icon: '☀️', color: 'bg-purple-100 text-purple-800' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg z-50">
        <div className="w-6 h-6" />
      </div>
    );
  }

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        {/* Main button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border hover:scale-110 active:scale-95 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700 text-gray-100' 
              : 'bg-purple-200 border-purple-300 text-purple-800'
          }`}
          aria-label="Change theme"
          type="button"
        >
          <span className="text-xl">{currentTheme.icon}</span>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <div className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl border py-2 z-50 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-purple-50 border-purple-200'
            }`}>
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left transition-colors flex items-center gap-3 ${
                    theme === 'dark'
                      ? `hover:bg-gray-700 ${theme === themeOption.value ? 'bg-gray-700' : ''}`
                      : `hover:bg-purple-100 ${theme === themeOption.value ? 'bg-purple-200' : ''}`
                  }`}
                >
                  <span className="text-lg">{themeOption.icon}</span>
                  <span className="text-sm font-medium">{themeOption.label}</span>
                  {theme === themeOption.value && (
                    <span className="ml-auto text-green-500">✓</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}