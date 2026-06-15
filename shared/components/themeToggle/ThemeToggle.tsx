"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Icon from "@/shared/components/icon/Icon";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="h-5 w-5 cursor-pointer shrink-0 flex items-center justify-center"
      aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
    >
      <Icon name={theme === "light" ? "moon" : "sun"} variant="default" />
    </button>
  );
};

export default ThemeToggle;
