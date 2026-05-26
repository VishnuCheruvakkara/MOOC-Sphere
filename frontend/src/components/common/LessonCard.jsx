import { getYoutubeThumbnail } from '../../utils/youtube';
import { markLessonVisited } from '../../services/courseService';
import { FaCheckCircle } from 'react-icons/fa';
import { showSuccess, showError } from '../../utils/toast';

export default function LessonCard({ lesson, onClick, isActive, onVisited, index }) {
    const handleClick = async () => {
        try {
            await markLessonVisited(lesson.id);
            showSuccess('Lesson marked as visited');
        } catch (err) {
            console.log('visit failed', err);
            showError('Failed to mark lesson');
        }

        if (typeof onVisited === 'function') onVisited(lesson.id);

        onClick();
    };

    return (
        <div
            onClick={handleClick}
            className={`cursor-pointer border-2 p-3 transition bg-butter-cream-100
            ${
                isActive
                    ? 'border-deep-lavender-500 bg-butter-cream-400'
                    : 'border-deep-lavender-300 hover:bg-butter-cream-400'
            }`}
        >
            <div className="flex gap-3 items-start">

                {/* THUMBNAIL */}
                <div className="relative w-20 h-14 overflow-visible">
                    <img
                        src={getYoutubeThumbnail(lesson.video_url)}
                        className="w-20 h-14 object-cover border border-deep-lavender-300"
                        alt={lesson.title}
                    />

                    {lesson.is_visited && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-white bg-opacity-90 border-2 border-green-600 text-green-600 px-1 py-1 rounded-full shadow-md flex items-center">
                                <FaCheckCircle className="text-green-600 text-lg" />
                            </div>
                        </div>
                    )}
                </div>

                {/* CONTENT */}
                <div className="flex-1">

                    {/* 🔢 LESSON NUMBER */}
                    <p className="text-xs text-gray-400 font-medium">
                        Lesson {index + 1}
                    </p>

                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                        {lesson.title}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {lesson.content}
                    </p>
                </div>

            </div>
        </div>
    );
}