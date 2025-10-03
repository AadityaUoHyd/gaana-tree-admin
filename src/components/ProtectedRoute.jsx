import {useAuth} from "../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children, requireAdmin = false}) => {
    const {isAuthenticated, isAdmin, loading} = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated()) {
        return <Navigate to='/login' replace />;
    }

    if(requireAdmin && !isAdmin()) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-4">Access Denied</div>
                    <p className="text-white text-lg">You need admin privilage to access this page.</p>
                </div>
            </div>
        )
    }

    return children;
}

export default ProtectedRoute;