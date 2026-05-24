import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import CustomToaster from './components/ui/CustomToaster';

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <CustomToaster />
        </>
    );
}

export default App;
