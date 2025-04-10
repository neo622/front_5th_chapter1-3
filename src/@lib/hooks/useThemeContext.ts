import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext.tsx";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }
  return context;
};
