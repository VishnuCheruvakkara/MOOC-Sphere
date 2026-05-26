export default function Loader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-soft-lavender-100 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-deep-lavender-200 border-t-deep-lavender-500" />

                <p className="text-sm font-medium tracking-wide text-deep-lavender-500">
                    Loading...
                </p>
            </div>
        </div>
    );
}