import React, { useState } from "react";
import { generateItems } from "./utils";
import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { ComplexForm } from "./components/ComplexForm";
import { NotificationSystem } from "./components/NotificationSystem";
import { Wrapper } from "./components/Wrapper";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import { NotificationContextProvider } from "./context/NotificationContext.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
// 메인 App 컴포넌트
const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <ThemeContextProvider>
      <NotificationContextProvider>
        <AuthContextProvider>
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
        </AuthContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
