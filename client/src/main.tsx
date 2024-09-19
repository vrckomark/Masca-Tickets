import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import App from "./App";
import { wagmiConfig } from "./wagmi";

import "@rainbow-me/rainbowkit/styles.css";
import "./assets/styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import MascaProvider from "./contexts/MascaProvider";
import { store } from "./store/store";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Router>
    <Provider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <MascaProvider>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()}>
              <App />
            </RainbowKitProvider>
          </QueryClientProvider>
        </MascaProvider>
      </WagmiProvider>
    </Provider>
  </Router>
);
