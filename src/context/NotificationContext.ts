import { createContext } from "react";
import { NotificationContextType } from "../type/type";

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
