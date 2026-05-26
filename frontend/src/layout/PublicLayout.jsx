import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function PublicLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-butter-cream-300 ">
            <Navbar />

            {/* Page content */}
            <main className="flex-1 mt-16">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
