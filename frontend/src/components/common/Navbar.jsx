import { useNavigate, Link } from 'react-router-dom';

import { PiGraduationCapFill } from 'react-icons/pi';
import { FiLogIn } from 'react-icons/fi';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { logoutuser } from '../../services/authService';

import Button from '../ui/Button';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/Slices/authSlice';
import { persistor } from '../../redux/store';

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        try {
            await logoutuser();

            dispatch(logout());
            await persistor.purge();

            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b-2 border-deep-lavender-400 bg-butter-cream-100 h-16 site-header">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 text-deep-lavender-500"
                    >
                        <div className="p-2 border-2 border-deep-lavender-400 bg-butter-cream-200">
                            <PiGraduationCapFill className="text-2xl" />
                        </div>

                        <span className="text-xl font-bold tracking-tight">
                            MOOC Sphere
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center gap-3">
                        {!isAuthenticated ? (
                            <>
                                {/* Only large screens */}
                                <div className="hidden md:flex items-center gap-3">
                                    <Button
                                        text="Login"
                                        icon={<FiLogIn />}
                                        onClick={() => navigate('/login')}
                                    />

                                    <Button
                                        text="Sign Up"
                                        icon={<HiOutlineUserAdd />}
                                        type="primary"
                                        onClick={() => navigate('/signup')}
                                    />
                                </div>
                            </>
                        ) : (
                            /* Logout always visible */
                            <Button
                                text="Logout"
                                type="primary"
                                onClick={handleLogout}
                            />
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
