import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Login() {

    function handleSubmit() {}

    return (

        <div className="relative min-h-screen overflow-hidden">

            {/* Background Image */}
            <img
                src="/home_page.png"
                alt="Login Background"
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black/10" />

            {/* Login Content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">

                <div className="w-full max-w-[420px] border border-white/20 bg-white/10 p-8 backdrop-blur-md">

                    {/* Heading */}
                    <div className="text-center">

                        <h2 className="text-3xl font-bold text-white">
                            Welcome Back
                        </h2>

                        <p className="mt-2 text-sm text-white/70">
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
                    <p className="mt-6 text-center text-sm text-white/70">

                        Don&apos;t have an account?

                        <Link
                            to="/signup"
                            className="ml-2 font-semibold text-white"
                        >
                            Sign Up
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );
}