import { useAuth } from "../context/AuthContext.jsx";
import { User, Mail, Shield } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout.jsx";

const AdminProfile = () => {
    const { user } = useAuth();

    return (
        <DashboardLayout activeMenu="Admin Profile">
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Profile</h2>

            <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Profile avatar */}
                <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-500" />
                    </div>
                </div>

                {/* Profile details */}
                <div className="flex-1">
                    <p className="text-gray-700 text-lg font-semibold mb-2">
                        {user?.name || "Admin"}
                    </p>
                    <p className="flex items-center gap-2 text-gray-600 mb-2">
                        <Mail className="w-4 h-4 text-gray-500" /> {user?.email}
                    </p>
                    <p className="flex items-center gap-2 text-gray-600 mb-2">
                        <Shield className="w-4 h-4 text-gray-500" /> Role: {user?.role || "Admin"}
                    </p>
                    <p className="text-gray-600 text-sm">
                        This profile contains your admin information and account settings.
                    </p>
                </div>
            </div>
        </div>
        </DashboardLayout>
    );
};

export default AdminProfile;
