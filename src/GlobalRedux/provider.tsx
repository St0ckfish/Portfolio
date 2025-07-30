"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import React, { useEffect } from "react";
import { hydrate } from "@/features/boolyanSlice";

interface ProvidersProps {
  children: React.ReactNode;
}

function HydrationHandler() {
  useEffect(() => {
    // Hydrate the theme from localStorage after component mounts
    store.dispatch(hydrate());
  }, []);

  return null;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <HydrationHandler />
      {children}
    </Provider>
  );
}
