import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import CustomToaster from './components/ui/CustomToaster';
import { getCurrentUser } from './services/authService';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout, setBootstrapped } from './redux/Slices/authSlice';
import { persistor } from './redux/store';
import Loader from './components/ui/Loader';

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const bootstrapAuth = async () => {
            try {
                const user = await getCurrentUser();
                dispatch(loginSuccess({ user }));
            } catch (error) {
                dispatch(logout());
                await persistor.purge();
            } finally {
                dispatch(setBootstrapped());
                setLoading(false);
            }
        };

        bootstrapAuth();
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <RouterProvider router={router} />
            <CustomToaster />
        </>
    );
}

export default App;
