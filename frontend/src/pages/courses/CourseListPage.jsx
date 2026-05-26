import { useEffect, useState } from 'react';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import Pagination from '../../components/ui/Pagination';

import { getCourses, enrollCourse } from '../../services/courseService';
import { getYoutubeThumbnail } from '../../utils/youtube';

import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { showError, showSuccess } from '../../utils/toast';

// ✅ added icon
import { FaCheckCircle } from 'react-icons/fa';

function CourseListPage() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const type = params.get('type');

    const isMyCourses = type === 'my-courses';

    const { isAuthenticated } = useSelector((state) => state.auth);

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

    const pageTitle = isMyCourses ? 'My Courses' : 'All Courses';

    const pageDescription = isMyCourses
        ? 'Your enrolled courses and learning progress.'
        : 'Browse available courses and start learning today.';

    const searchPlaceholder = isMyCourses
        ? 'Search your courses...'
        : 'Search courses...';

    const emptyTitle = isMyCourses ? 'No Courses Yet' : 'No Courses Found';

    const emptyDesc = isMyCourses
        ? 'You have not enrolled in any courses yet.'
        : 'Try searching with different keywords.';

    const fetchCourses = async () => {
        try {
            setLoading(true);

            const data = await getCourses(search, page, isMyCourses);

            setCourses(data.results);
            setNextPage(data.next);
            setPreviousPage(data.previous);
            setTotalPages(Math.ceil(data.count / 8));
        } catch (error) {
            console.error('Failed to fetch courses', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCourses();
        }, 700);

        return () => clearTimeout(timer);
    }, [search, page, type]);

    const handleEnroll = async (courseId) => {
        try {
            const response = await enrollCourse(courseId);

            const created = response.data.created;

            showSuccess(created ? 'Enrolled successfully' : 'Already enrolled');

            navigate(`/user/courses/${courseId}`);
        } catch (error) {
            console.error('Enrollment failed', error);
            showError('Enrollment failed');
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-soft-lavender-100 px-6 py-6">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-deep-lavender-500">
                        {pageTitle}
                    </h1>

                    <p className="mt-2 text-sm text-soft-lavender-500">
                        {pageDescription}
                    </p>
                </div>

                {/* Search */}
                <div className="mb-10 flex gap-3">
                    <Input
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />

                    <Button
                        text="Clear"
                        type="outline"
                        onClick={() => {
                            setSearch('');
                            setPage(1);
                        }}
                    />
                </div>

                {/* Courses grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="relative overflow-hidden border-2 border-deep-lavender-300 bg-butter-cream-100"
                        >

                            {/* ✅ Completed Badge */}
                            {course.is_completed && (
                                <div className="absolute right-2 top-2 z-10 flex items-center gap-1  bg-green-500 px-2 py-1 text-xs font-semibold text-white shadow">
                                    <FaCheckCircle className="text-white" />
                                    Completed
                                </div>
                            )}

                            {/* Thumbnail */}
                            <div className="aspect-video overflow-hidden bg-soft-lavender-200">
                                {course.first_lesson_video ? (
                                    <img
                                        src={getYoutubeThumbnail(
                                            course.first_lesson_video,
                                        )}
                                        alt={course.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-deep-lavender-400">
                                        No Thumbnail
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex min-h-[190px] flex-col p-4">
                                <h3 className="line-clamp-1 text-lg font-bold text-deep-lavender-500">
                                    {course.title}
                                </h3>

                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-deep-lavender-400">
                                    {course.description}
                                </p>

                                {/* Action */}
                                <div className="mt-auto pt-4">
                                    {!isAuthenticated ? (
                                        <Button
                                            text="Enroll Course"
                                            type="primary"
                                            onClick={() => {
                                                showError(
                                                    'Please login to enroll course',
                                                );
                                                navigate('/login');
                                            }}
                                        />
                                    ) : course.is_enrolled ? (
                                        <Button
                                            text="Continue Course"
                                            type="outline"
                                            onClick={() =>
                                                navigate(
                                                    `/user/courses/${course.id}`,
                                                )
                                            }
                                        />
                                    ) : (
                                        <Button
                                            text="Enroll Course"
                                            type="primary"
                                            onClick={() =>
                                                handleEnroll(course.id)
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state */}
                {courses.length === 0 && !loading && (
                    <div className="flex min-h-[350px] items-center justify-center py-16">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-deep-lavender-500">
                                {emptyTitle}
                            </h3>

                            <p className="mt-3 text-sm text-deep-lavender-400">
                                {emptyDesc}
                            </p>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    loading={loading}
                    nextPage={nextPage}
                    previousPage={previousPage}
                    setPage={setPage}
                />
            </div>
        </div>
    );
}

export default CourseListPage;