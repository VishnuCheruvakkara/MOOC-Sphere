import PublicLayout from "../layout/PublicLayout";

import LandingPage from "../pages/landing/LandingPage";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/SignUp";
import ErrorPage from "../pages/notfound/ErrorPage";

export const publicRoutes = {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
        {index:true,element:<LandingPage/>},
        {path:"login",element:<Login/>},
        {path:"signup",element:<SignUp/>}
    ]
}