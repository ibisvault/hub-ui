import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const THEME_ORDER: Array<"light" | "dark"> = ["light", "dark"];
const FRIENDLY_LABEL: Record<"light" | "dark", string> = {
  light: "Light",
  dark: "Dark",
};

export function ThemeToggle() {
  const { theme, actualTheme, toggleTheme } = useTheme();
  const currentTheme = theme === "system" ? actualTheme : theme;
  const currentIndex = THEME_ORDER.indexOf(currentTheme);
  const nextTheme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];

  const icon =
    actualTheme === "light" ? (
      <Sun className="h-[1.2rem] w-[1.2rem]" />
    ) : (
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    );

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={`Switch to ${FRIENDLY_LABEL[nextTheme]} theme`}
    >
      {icon}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
