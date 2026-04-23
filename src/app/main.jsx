import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import { AppProviders } from "./providers";
import App from "./App";
import "../i18n";
import "../styles/index.css";

registerSW({ immediate: true });

document.documentElement.classList.remove("light");
document.documentElement.classList.add("dark");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
