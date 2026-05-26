import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../components/ui/Loader';
import { getCourseDetail } from '../../services/courseService';

import { YoutubePlayer } from '../../utils/youtube';
import LessonCard from '../../components/common/LessonCard';

export default function CourseDetailPage() {
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);

                const data = await getCourseDetail(id);

                setCourse(data);

                if (data.lessons?.length > 0) {
                    setActiveLesson(data.lessons[0]);
                }

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    if (loading) return <Loader />;
    if (!course) return <div>Course not found</div>;

    // PROGRESS CALCULATION
    const totalLessons = course.lessons?.length || 0;
    const completedLessons = course.lessons?.filter(l => l.is_visited).length || 0;
    const progressPercent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

    return (
        <div className="min-h-screen bg-soft-lavender-100 px-6 py-6">

            <div className="mx-auto max-w-7xl">

                {/* TITLE */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-deep-lavender-500">
                        {course.title}
                    </h1>

                    <p className="mt-2 text-sm text-gray-600">
                        {course.description}
                    </p>

                    {/* PROGRESS BAR */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{completedLessons} / {totalLessons} ({progressPercent}%)</span>
                        </div>

                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 transition-all"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT - VIDEO */}
                    <div className="lg:col-span-2 space-y-4">

                        <YoutubePlayer
                            url={activeLesson?.video_url}
                            title={activeLesson?.title}
                        />

                        {/* DESCRIPTION BOX */}
                        {activeLesson && (
                            <div className="p-4 border-2 border-deep-lavender-200 bg-butter-cream-100">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {activeLesson.title}
                                </h2>

                                <p className="mt-2 text-sm text-gray-600 leading-6">
                                    {activeLesson.content}
                                </p>
                            </div>
                        )}

                    </div>

                    {/* RIGHT - LESSON LIST */}
                    <div className="space-y-3">

                        <h2 className="text-lg font-bold text-deep-lavender-600">
                            Lessons
                        </h2>

                        {course.lessons.map((lesson, index) => (
                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                                index={index} 
                                isActive={activeLesson?.id === lesson.id}
                                onClick={() => setActiveLesson(lesson)}
                                onVisited={(lessonId) => {
                                    setCourse((prev) => {
                                        if (!prev) return prev;

                                        const lessons = prev.lessons.map((l) =>
                                            l.id === lessonId ? { ...l, is_visited: true } : l
                                        );

                                        return { ...prev, lessons };
                                    });

                                    if (activeLesson?.id === lessonId) {
                                        setActiveLesson((prev) =>
                                            prev ? { ...prev, is_visited: true } : prev
                                        );
                                    }
                                }}
                            />
                        ))}

                    </div>

                </div>

            </div>
        </div>
    );
}