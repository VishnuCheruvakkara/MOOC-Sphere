import UserLayout from '../layout/UserLayout';
import Courses from '../pages/user-dashboard/Courses';
import MyLearning from '../pages/user-dashboard/MyLearning';

export const userRoutes = {
    path: '/user',
    element: <UserLayout />,
    children: [
        { index: true, element: <Courses /> },
        { path: 'courses', element: <Courses /> },
        { path: 'my-learning', element: <MyLearning /> },
    ],
};
