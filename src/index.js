// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Ensure you're using 'react-dom/client'
import App from "./App";
import reportWebVitals from "./reportWebVitals"; // Import reportWebVitals

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); // Use createRoot for React 18

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Log results (for example: performance metrics)
reportWebVitals(); // Call it here



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
