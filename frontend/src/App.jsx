function App() {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-butter-cream-100 text-gray-800">
                {/* header */}
                <header className="flex items-center justify-between px-6 py-4 bg-butter-cream-300 shadow-sm">
                    <h1 className="text-xl font-bold text-deep-lavender-500">
                        MOOC Sphere
                    </h1>

                    <nav className="flex gap-6 text-sm">
                        <a className="hover:text-light-violet-500" href="#">
                            home
                        </a>
                        <a className="hover:text-light-violet-500" href="#">
                            features
                        </a>
                        <a className="hover:text-light-violet-500" href="#">
                            pricing
                        </a>
                        <a className="hover:text-light-violet-500" href="#">
                            contact
                        </a>
                    </nav>

                    <button className="px-4 py-2 rounded-lg bg-deep-lavender-400 text-white-cream-100 hover:bg-deep-lavender-500">
                        get started
                    </button>
                </header>

                {/* body */}
                <main className="flex-1 flex items-center justify-center px-6">
                    <div className="text-center max-w-2xl">
                        <h2 className="text-4xl font-bold text-deep-lavender-500 mb-4">
                            build something beautiful
                        </h2>

                        <p className="text-gray-600 mb-6">
                            a simple landing page using your custom butter cream
                            and lavender theme. clean, soft and modern UI with
                            tailwind 4.
                        </p>

                        <div className="flex gap-4 justify-center">
                            <button className="px-6 py-3 rounded-xl bg-soft-lavender-300 hover:bg-soft-lavender-400">
                                explore
                            </button>

                            <button className="px-6 py-3 rounded-xl border border-deep-lavender-300 hover:bg-deep-lavender-100">
                                learn more
                            </button>
                        </div>
                    </div>
                </main>

                {/* footer */}
                <footer className="px-6 py-4 text-center text-sm bg-white-cream-100 border-t border-butter-cream-300">
                    <p>© 2026 myapp. all rights reserved.</p>
                </footer>
            </div>
        </>
    );
}

export default App;
