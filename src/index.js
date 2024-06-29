import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./output.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SidebarProvider } from "./context/SidebarContext";
import ThemedSuspense from "./components/ThemedSuspense";
import { Windmill } from "@windmill/react-ui";
import windmillTheme from "./windmillTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SidebarProvider>
      <Suspense fallback={<ThemedSuspense />}>
        <Windmill usePreferences theme={windmillTheme}>
          <Provider store={store}>
            <App />
          </Provider>
        </Windmill>
      </Suspense>
    </SidebarProvider>
  </React.StrictMode>
);

