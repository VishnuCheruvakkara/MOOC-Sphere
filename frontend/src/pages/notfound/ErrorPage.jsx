import { useRouteError,useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { IoHomeSharp } from "react-icons/io5";

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-butter-cream-100 text-center px-6">
            <h1 className="text-6xl font-bold text-deep-lavender-500">Oops!</h1>

            <p className="mt-4 text-xl text-soft-lavender-500">
                Something went wrong or page not found
            </p>

            <div className="p-5">

            <Button
                text="Go Home"
                icon={<IoHomeSharp />}
                type="ouline"
                onClick={() => navigate('/')}
            />
            </div>

        </div>
    );
}
