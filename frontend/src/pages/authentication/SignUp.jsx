import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function SignUp() {

    return (
        <div className="flex items-center justify-center bg-soft-lavender-100 px-6 py-15">

            <div className="w-full max-w-[420px] border-2 border-deep-lavender-400 bg-butter-cream-100 p-8">

                {/* Heading */}
                <div className="text-center">

                    <h2 className="text-3xl font-bold text-deep-lavender-500">
                        Create Account
                    </h2>

                    <p className="mt-2 text-sm text-deep-lavender-300">
                        Start your learning journey today
                    </p>

                </div>

                {/* Form */}
                <div className="mt-8 flex flex-col gap-4">

                    <Input
                        type="text"
                        placeholder="Full Name"
                    />

                    <Input
                        type="email"
                        placeholder="Email"
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                    />

                    <Input
                        type="password"
                        placeholder="Confirm Password"
                    />

                    <Button
                        text="Sign Up"
                        icon={<HiOutlineUserAdd />}
                        type="primary"
                    />

                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-deep-lavender-400">

                    Already have an account?

                    <Link
                        to="/login"
                        className="ml-2 font-semibold text-deep-lavender-500"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}