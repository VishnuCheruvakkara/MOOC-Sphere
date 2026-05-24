import UserLayout from '../layout/UserLayout';
import Courses from '../pages/user-dashboard/Courses';
import MyLearning from '../pages/user-dashboard/MyLearning';
import { userAuthLoader } from './loader';

export const userRoutes = {
    path: '/user',
    element: <UserLayout />,
    loader: userAuthLoader,
    children: [
        { index: true, element: <Courses /> },
        { path: 'courses', element: <Courses /> },
        { path: 'my-learning', element: <MyLearning /> },
    ],
};
