import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import  Index  from "./Page/index";

const router = createBrowserRouter([
  {
    path: "/",
        element: <Index />,
  }
])
function App() {


  return <RouterProvider router={router} />
}

export default App
