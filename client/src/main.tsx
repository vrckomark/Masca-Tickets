import { BrowserRouter as Router } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import App from "./App";
import { wagmiConfig } from "./wagmi";
import "./assets/styles/index.css";
import { store } from "./store/store";
import MascaApiProvider from "./components/providers/MascaApiProvider";
import ModalContextProvider from "./contexts/ModalContextProvider";
import { CustomTheme } from "./config/rainbotKit";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Router>
    <Provider store={store}>
      <ModalContextProvider>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={CustomTheme}>
              <MascaApiProvider>
                <App />
              </MascaApiProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ModalContextProvider>
    </Provider>
  </Router>
);
