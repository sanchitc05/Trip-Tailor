import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppContextProvider({ children }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const value = useMemo(
    () => ({ commandPaletteOpen, setCommandPaletteOpen }),
    [commandPaletteOpen],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
