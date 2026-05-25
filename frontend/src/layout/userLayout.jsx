import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import UserMenu from '../components/common/UserMenu';

export default function UserLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-butter-cream-300">

            <Navbar />

            <div className="pt-16">

                <UserMenu />

                <main className="flex-1">
                    <Outlet />
                </main>

                <Footer />

            </div>
        </div>
    );
}