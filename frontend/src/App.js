import './App.css';
import { RouterProvider, createBrowserRouter,  } from "react-router-dom";
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import Login from './components/Login';

const router = createBrowserRouter([
   {
    path:"/",
    element:<HomePage/>
   },
   {
    path:"/register",
    element:<Signup/>
   },
   {
    path:"/login",
    element:<Login />
   },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
