import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useSelector } from 'react-redux';

export default function UserMenu() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="border-b-2 border-deep-lavender-300 bg-butter-cream-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
                {/* LEFT: USER INFO */}
                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center r bg-deep-lavender-100 text-deep-lavender-600 border-2 border-deep-lavender-500 cursor-pointer">
                        <FaRegUserCircle className="text-2xl text-deep-lavender-500" />
                    </div>

                    <div>
                        <h2 className="text-deep-lavender-500 font-bold text-lg">
                            Hello {user?.username || 'User'}
                        </h2>

                        <p className="text-xs text-deep-lavender-400">
                            {user?.email || 'No email found'}
                        </p>
                    </div>
                </div>

                {/* RIGHT: BUTTONS */}
                <div className="flex items-center gap-3">
                    <Button
                        text="All Courses"
                        onClick={() => navigate('/user?type=all-courses')}
                    />

                    <Button
                        text="My Courses"
                        type="primary"
                        onClick={() => navigate('/user?type=my-courses')}
                    />
                </div>
            </div>
        </div>
    );
}
