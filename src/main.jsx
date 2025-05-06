import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router";
import { RootLayout } from './layout/RootLayout.jsx';
import firebaseConfig from '../firebase.config.js';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
