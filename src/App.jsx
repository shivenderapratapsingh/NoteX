import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col items-center w-full ">
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div className="flex flex-col items-center">
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div className="flex flex-col items-center w-full">
        <ViewPaste />
      </div>
    ),
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
      {/* <Background/> */}
    </div>
  );
}

export default App;
