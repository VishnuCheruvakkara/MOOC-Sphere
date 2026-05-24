import { createBrowserRouter } from "react-router-dom";

import { publicRoutes } from "./public.routes";
import { userRoutes } from "./user.routes";

export const router = createBrowserRouter([
    publicRoutes,
    userRoutes
])