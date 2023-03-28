import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider, ScrollRestoration} from "react-router-dom";
import Login from "./views/Login";
import Root from "./routes/root";
import ErrorPage from "./views/error-page";
import Home from "./views/home";
import CookBook from "./views/cookbook";
import About from "./views/about";
import CookbookDetail from "./views/cookbook-detail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/home",
                element: <Home/>
            },
            {
                path: "/cookbook",
                element: <CookBook/>
            },
            {
                path: "/cookbook/:id",
                element: <CookbookDetail/>
            },
            {
                path: "/about",
                element: <About/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>,
    },

]);


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


