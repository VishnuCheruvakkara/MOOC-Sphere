import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { FiLogIn } from 'react-icons/fi';

import { loginUser } from '../../services/authService';
import { loginSuccess } from '../../redux/Slices/authSlice';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from '../../validations/auth.schema';
import { showSuccess, showError } from '../../utils/toast';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);

            dispatch(
                loginSuccess({
                    user: response.data,
                }),
            );

            showSuccess('Welcome back');
            navigate('/user');
        } catch (error) {
            console.error(error?.response);

            showError(
                error?.response?.data?.non_field_errors[0] ||
                    'Login failed',
            );
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background */}
            <img
                src="/home_page.png"
                alt="Login Background"
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black/10" />

            {/* Content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
                <div className="w-full max-w-[420px] border border-white/20 bg-black/50 p-8 backdrop-blur-sm">
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
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 flex flex-col gap-4"
                    >
                        <Input
                            type="email"
                            placeholder="Email"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm">
                                {errors.email.message}
                            </p>
                        )}

                        <Input
                            type="password"
                            placeholder="Password"
                            {...register('password')}
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm">
                                {errors.password.message}
                            </p>
                        )}

                        <Button
                            text={isSubmitting ? 'Loading...' : 'Login'}
                            icon={<FiLogIn />}
                            type="primary"
                            disabled={!isValid || isSubmitting}
                        />
                    </form>

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
