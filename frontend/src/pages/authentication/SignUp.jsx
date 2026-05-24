import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { HiOutlineUserAdd } from 'react-icons/hi';

import { signupUser } from '../../services/authService';
import { loginSuccess } from '../../redux/Slices/authSlice';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import publicAxios from '../../api/publicAxios';
import { signupSchema } from '../../validations/auth.schema';

import { showSuccess, showError } from '../../utils/toast';

export default function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid },
    } = useForm({ resolver: zodResolver(signupSchema), mode:"onChange"});

    const onSubmit = async (data) => {
        try {
            const response = await signupUser({
                username: data.username,
                email: data.email,
                password: data.password,
            });
            console.log("data->",response?.data)
            dispatch(
                loginSuccess({ user: response.data }),
            );
            showSuccess("Account created")
            navigate('/user');
        } catch (error) {
            console.error(error?.message);
            showError("Signup failed, Try again!")
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <img
                src="/home_page.png"
                alt="Signup Background"
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black/10" />

            {/* Signup Content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
                <div className="w-full max-w-[420px] border border-white/20 bg-black/50 p-8 backdrop-blur-sm">
                    {/* Heading */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white">
                            Create Account
                        </h2>

                        <p className="mt-2 text-sm text-white/70">
                            Start your learning journey today
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 flex flex-col gap-4"
                    >
                        <Input
                            type="text"
                            placeholder="Full Name"
                            {...register('username')}
                        />
                        {errors.username && (
                            <p className="text-red-400 text-sm">
                                {errors.username.message}
                            </p>
                        )}

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

                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            {...register('confirm_password')}
                        />
                        {errors.confirm_password && (
                            <p className="text-red-400 text-sm">
                                {errors.confirm_password.message}
                            </p>
                        )}
                        <Button
                            text={isSubmitting ? "Loading..." : "Sign Up"}
                            icon={<HiOutlineUserAdd />}
                            type="primary"
                            disabled={!isValid || isSubmitting }
                        />
                    </form>

                    {/* Footer */}
                    <p className="mt-6 text-center text-sm text-white/70">
                        Already have an account?
                        <Link
                            to="/login"
                            className="ml-2 font-semibold text-white"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
