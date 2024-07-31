import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./Page/index";
import Layout from "./Page/Layout";
import Home from "./Components/Home";
import Projects from "./Components/Projects";

import Templates from "./Components/Templates";
import CreateDesign from "./Components/CreateDesign";
import Main from "./Page/Main";
import { token_decode } from "./utils";

const userInfo = token_decode(localStorage.getItem("Canva_token"));
const router = createBrowserRouter([
  {
    path: "/",
    element: userInfo ? <Layout /> : <Index />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Projects",
        element: <Projects />,
      },
      {
        path: "/Templates",
        element: <Templates />,
      },
    ],
  },
  {
    path: "/design/create",
    element: <CreateDesign />,
  },
  {
    path: "/design/:design_id/edit",
    element: <Main />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
