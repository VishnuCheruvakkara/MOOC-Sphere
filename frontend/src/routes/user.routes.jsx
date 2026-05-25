import UserLayout from '../layout/UserLayout';
import Courses from '../pages/user-dashboard/Courses';
import MyLearning from '../pages/user-dashboard/MyLearning';
import UserRouteProtection from './guard/UserRouteProtection';

export const userRoutes = {
    path: '/user',
    element: (
        <UserRouteProtection>
            <UserLayout />
        </UserRouteProtection>
    ),
    children: [
        { index: true, element: <Courses /> },
        { path: 'courses', element: <Courses /> },
        { path: 'my-learning', element: <MyLearning /> },
    ],
};
