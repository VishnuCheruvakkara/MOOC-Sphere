import { useEffect,useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { getCurrentUser } from '../services/authService';
import { useDispatch } from 'react-redux';
import { loginSuccess,logout } from '../redux/Slices/authSlice';
import { persistor } from '../redux/store';
import Loader from '../components/ui/Loader';

export default function UserLayout() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const verifyUser = async () => {
            setLoading(true);
            try {
                const user = await getCurrentUser();
                dispatch(loginSuccess({ user }));
            } catch (error) {
                console.error(error.message);
                dispatch(logout());
                await persistor.purge();
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-butter-cream-300">
            <Navbar />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
