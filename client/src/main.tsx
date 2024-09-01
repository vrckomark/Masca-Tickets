import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { config } from "./wagmi";
import { MascaProvider } from "./MascaProvider";

import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <WagmiProvider config={config}>
        <MascaProvider>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()}>
              <App />
            </RainbowKitProvider>
          </QueryClientProvider>
        </MascaProvider>
      </WagmiProvider>
    </StrictMode>
  </BrowserRouter>
);
