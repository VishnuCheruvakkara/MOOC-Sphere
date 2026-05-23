import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Login() {

    function handleSubmit() {}

    return (
        <div className="py-20 flex items-center justify-center bg-soft-lavender-100 px-6">

            <div className="w-full max-w-[420px] border-2 border-deep-lavender-400 bg-butter-cream-100 p-8">

                {/* Heading */}
                <div className="text-center">

                    <h2 className="text-3xl font-bold text-deep-lavender-500">
                        Welcome Back
                    </h2>

                    <p className="mt-2 text-sm text-deep-lavender-300">
                        Continue your learning journey
                    </p>

                </div>

                {/* Form */}
                <div className="mt-8 flex flex-col gap-4">

                    <Input
                        type="email"
                        placeholder="Email"
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                    />

                    <Button
                        text="Login"
                        icon={<FiLogIn />}
                        type="primary"
                        onClick={handleSubmit}
                    />

                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-deep-lavender-400">

                    Don&apos;t have an account?

                    <Link
                        to="/signup"
                        className="ml-2 font-semibold text-deep-lavender-500"
                    >
                        Sign Up
                    </Link>

                </p>

            </div>

        </div>
    );
}