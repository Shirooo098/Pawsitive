import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import HomePage from './pages/HomePage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.jsx';
import Layout from './components/Layout.jsx';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <HomePage/>,
          errorElement: <div>404 Not Found</div>
        },
        {
          path: 'RegisterPage',
          element: <RegisterPage/>
        }
      ]
    }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
