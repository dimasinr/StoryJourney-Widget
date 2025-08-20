import React from "react";
import ReactDOM from "react-dom/client";
import reactToWebComponent from "react-to-webcomponent";
import App from "./App";

// Convert React component → Web Component
// Explicitly declare observed props so attributes (kebab-case) map to these props (camelCase)
const MyWidget = reactToWebComponent(App, React, ReactDOM, {
  props: ["sjKey", "sjUser"],
});

// Register sebagai custom element <my-widget>
customElements.define("storyjourney-widget", MyWidget);
