import { createContext } from "react";
import { AuthContextType } from "../type/type";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
