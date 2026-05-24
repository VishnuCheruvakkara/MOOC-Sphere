import { z } from "zod";

export const signupSchema = z.object({
    username: z
        .string()
        .min(3, "Full name must be at least 3 characters")
        .regex(
            /^[a-zA-Z0-9_ ]+$/,
            "Full name can only contain letters, numbers, underscore and space"
        ),

    email: z.string().email("Invalid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Za-z]/, "Password must contain at least one letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[!@#$%^&*()]/,
            "Password must contain at least one special character"
        ),

    confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});