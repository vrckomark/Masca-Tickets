import { lightTheme, Theme } from "@rainbow-me/rainbowkit";
import merge from "lodash.merge";

export const CustomTheme = merge(lightTheme(), {
  colors: {
    connectButtonBackground: "#9092f3",
    connectButtonText: "#ffffff",
    accentColor: "#9092f3",
  },
} as Theme);
