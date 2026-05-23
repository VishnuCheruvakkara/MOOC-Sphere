export default function Input({
    type = "text",
    placeholder,
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="w-full px-4 py-2 border-2 border-deep-lavender-200 bg-soft-lavender-100 text-deep-lavender-500 outline-none focus:border-deep-lavender-400"
        />
    );
}