import UserLayout from '../layout/UserLayout';
import Courses from '../pages/user-dashboard/Courses';
import MyLearning from '../pages/user-dashboard/MyLearning';
import UserRouteProtection from './guard/UserRouteProtection';
import ErrorPage from '../pages/notfound/ErrorPage';

export const userRoutes = {
    path: '/user',
    element: (
        <UserRouteProtection>
            <UserLayout />
        </UserRouteProtection>
    ),
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <Courses /> },
        { path: 'courses', element: <Courses /> },
        { path: 'my-learning', element: <MyLearning /> },
    ],
};
