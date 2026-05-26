import PublicLayout from "../layout/PublicLayout";

import LandingPage from "../pages/landing/LandingPage";
import CourseListPage from "../pages/courses/CourseListPage";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/SignUp";
import ErrorPage from "../pages/notfound/ErrorPage";
import PublicRouteProtection from "./guard/PublicRouteProtection";

export const publicRoutes = {
    path: "/",
    element: (
        <PublicRouteProtection>
            <PublicLayout />
        </PublicRouteProtection>
    ),
    errorElement: <ErrorPage />,
    children: [
        {index:true,element:<LandingPage/>},
        {path:"courses",element:<CourseListPage/>},
        {path:"login",element:<Login/>},
        {path:"signup",element:<SignUp/>}
    ]
}