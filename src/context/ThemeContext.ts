import { createContext } from "react";
import { ThemeContextType } from "../type/type";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
