import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FocusStyleManager } from "@blueprintjs/core";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { TodoListPage } from "./todo/todo-list.page";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "english",
        element: <App />,
        errorElement: <div>Not Found</div>,
        children: [
          {
            path: "todos",
            element: <TodoListPage />,
          },
        ],
      },
    ],
  },
]);

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <RouterProvider router={router}></RouterProvider>
  // </React.StrictMode>
);
