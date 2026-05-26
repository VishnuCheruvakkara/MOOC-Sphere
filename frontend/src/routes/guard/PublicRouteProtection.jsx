import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/ui/Loader";

export default function PublicRouteProtection({ children }) {
    const { isAuthenticated, bootstrapped } = useSelector(
        state => state.auth
    );

    if (!bootstrapped) {
        return <Loader />;
    }

    if (isAuthenticated) {
        return <Navigate to="/user" replace />;
    }

    return children;
}