import { useTheme as useThemeProvider } from "@/components/theme-provider";

export interface UseThemeReturn {
  theme: "dark" | "light" | "system";
  actualTheme: "dark" | "light";
  systemTheme: "dark" | "light";
  setTheme: (theme: "dark" | "light" | "system") => void;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
  isSystem: boolean;
  getCSSVariable: (variable: string) => string;
}

export function useTheme(): UseThemeReturn {
  const { theme, setTheme, actualTheme, systemTheme } = useThemeProvider();

  const isDark = actualTheme === "dark";
  const isLight = actualTheme === "light";
  const isSystem = theme === "system";

  const toggleTheme = () => {
    const themeOrder: Array<"light" | "dark"> = ["light", "dark"];
    const currentTheme = theme === "system" ? systemTheme : theme;
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    setTheme(nextTheme);
  };

  const getCSSVariable = (variable: string) => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`).trim();
    }
    return "";
  };

  return {
    theme,
    actualTheme,
    systemTheme,
    setTheme,
    toggleTheme,
    isDark,
    isLight,
    isSystem,
    getCSSVariable,
  };
}
