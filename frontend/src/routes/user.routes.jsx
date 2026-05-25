import UserLayout from '../layout/UserLayout';
import CourseListPage from '../pages/courses/CourseListPage';
import MyLearning from '../pages/user-dashboard/MyLearning';
import UserRouteProtection from './guard/UserRouteProtection';
import ErrorPage from '../pages/notfound/ErrorPage';
import CourseDetailPage from '../pages/courses/CourseDetailPage';

export const userRoutes = {
    path: '/user',
    element: (
        <UserRouteProtection>
            <UserLayout />
        </UserRouteProtection>
    ),
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <CourseListPage /> },
        { path: 'courses/:id', element: <CourseDetailPage /> },
    ],
};
