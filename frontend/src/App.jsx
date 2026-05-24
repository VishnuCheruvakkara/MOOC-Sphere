import { useEffect,useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import CustomToaster from './components/ui/CustomToaster';
import { getCurrentUser } from './services/authService';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './redux/Slices/authSlice';
import Loader from './components/ui/Loader';

function App() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        
        const verifyUser = async () => {
            setLoading(true);
            try {
                const user = await getCurrentUser();
                dispatch(loginSuccess({ user }))
            } catch (error) {
                console.error(error.message)
            } finally {
                setLoading(false);
            }
        }
        verifyUser();
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
