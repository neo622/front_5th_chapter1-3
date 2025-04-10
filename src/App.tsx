import React, { useState } from "react";
import { generateItems, renderLog } from "./utils";
import {
  User,
  Notification,
  AuthContextType,
  NotificationContextType,
  ThemeContextType,
} from "./type/type";
import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { ComplexForm } from "./components/ComplexForm";
import { NotificationSystem } from "./components/NotificationSystem";
import { useCallback, useMemo } from "./@lib";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import { AuthContext } from "./context/AuthContext";
import { Wrapper } from "./components/Wrapper";
import { NotificationContext } from "./context/NotificationContext.ts";
// 메인 App 컴포넌트
const App: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [items, setItems] = useState(generateItems(1000));
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, [setTheme]);

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  const login = (email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  };

  const logout = () => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  };

  const addNotification = (message: string, type: Notification["type"]) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const themeCtxValue: ThemeContextType = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  const authCtxValue: AuthContextType = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  const notificationCtxValue: NotificationContextType = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification]
  );

  return (
    <ThemeContextProvider>
      <AuthContext.Provider value={authCtxValue}>
        <NotificationContext.Provider value={notificationCtxValue}>
          <Wrapper>
            <Header />
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 md:pr-4">
                  <ItemList items={items} onAddItemsClick={addItems} />
                </div>
                <div className="w-full md:w-1/2 md:pl-4">
                  <ComplexForm />
                </div>
              </div>
            </div>
            <NotificationSystem />
          </Wrapper>
        </NotificationContext.Provider>
      </AuthContext.Provider>
    </ThemeContextProvider>
  );
};

export default App;
