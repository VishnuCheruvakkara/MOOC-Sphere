import { useEffect, useState } from 'react';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';

import Pagination from '../../components/ui/Pagination';

import { getCourses } from '../../services/courseService';

import { getYoutubeThumbnail } from '../../utils/youtube';

function CourseListPage() {
    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [nextPage, setNextPage] = useState(null);

    const [previousPage, setPreviousPage] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);

                const data = await getCourses(search, page);

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

        const timer = setTimeout(() => {
            fetchCourses();
        }, 700);

        return () => clearTimeout(timer);
    }, [search, page]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-soft-lavender-100 px-6 py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-deep-lavender-500">
                        All Courses
                    </h1>

                    <p className="mt-2 text-sm text-soft-lavender-500">
                        Browse available courses and start learning today.
                    </p>
                </div>

                <div className="mb-10 flex gap-3">
                    <Input
                        placeholder="Search courses..."
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

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="overflow-hidden border border-deep-lavender-300 bg-butter-cream-100"
                        >
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

                            <div className="flex min-h-[190px] flex-col p-4">
                                <h3 className="line-clamp-1 text-lg font-bold text-deep-lavender-500">
                                    {course.title}
                                </h3>

                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-deep-lavender-400">
                                    {course.description}
                                </p>

                                <div className="mt-auto pt-4">
                                    <Button text="View Course" type="primary" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {courses.length === 0 && !loading && (
                    <div className="flex min-h-[350px] items-center justify-center py-16">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-deep-lavender-500">
                                No Courses Found
                            </h3>

                            <p className="mt-3 text-sm text-deep-lavender-400">
                                Try searching with different keywords.
                            </p>
                        </div>
                    </div>
                )}

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
