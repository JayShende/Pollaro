"use client";

import { createContext, useContext, useState } from "react";

type Tab = "edit_form" | "responses" ;

interface TabsContextProps {
  tab: Tab;
  setTab: (tab: Tab) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export function TabsProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState<Tab>("edit_form");
  return (
    <TabsContext.Provider value={{ tab, setTab }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("useTabs must be used inside TabsProvider");
  return ctx;
}
