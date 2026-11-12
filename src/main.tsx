import React from "react";
import ReactDOM from "react-dom/client";
// Eixos peso + SOFT (serifas arredondadas dos posts). Metade do tamanho do arquivo "full".
import "@fontsource-variable/fraunces/soft.css";
import "@fontsource-variable/fraunces/soft-italic.css";
import "@fontsource-variable/plus-jakarta-sans";
import "./styles.css";
import App from "./App";

const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// O HTML de produção vem pré-renderizado (scripts/prerender.mjs); em dev o root começa vazio.
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
