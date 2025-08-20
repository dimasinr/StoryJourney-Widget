import React from "react";
import ReactDOM from "react-dom/client";
import reactToWebComponent from "react-to-webcomponent";
import App from "./App";

// Convert React component → Web Component
const MyWidget = reactToWebComponent(App, React, ReactDOM);

// Register sebagai custom element <my-widget>
customElements.define("storyjourney-widget", MyWidget);
