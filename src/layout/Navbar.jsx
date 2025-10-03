import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { LogOut, Menu, User, X, ChevronDown } from "lucide-react";
import { assets } from "../assets/assets.js";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const dropdownRef = useRef();

    const handleLogout = () => {
        logout();
        toast.success("Logout successful!");
        navigate("/login");
        setOpenDropdown(false);
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex items-center justify-between gap-5 bg-gray-900 border-b border-purple-600/40 backdrop-blur-md py-4 px-4 sm:px-7 sticky top-0 z-30 shadow-lg">
            {/* Left side menu button and title */}
            <div className="flex items-center gap-5">
                <button
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                    className="block lg:hidden text-white hover:bg-purple-700/30 p-2 rounded-full transition-colors shadow-md"
                >
                    {openSideMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* ✅ Beautified Logo + Title */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/admin-dashboard")}>
                    <img
                        src={assets.logo}
                        alt="logo"
                        className="w-12 h-12 rounded-full shadow-lg shadow-purple-500/60"
                    />
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(168,85,247,0.8)] animate-pulse">
                        GaanaTree Admin
                    </span>
                </div>
            </div>

            {/* Right side - Admin dropdown */}
            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
                <div
                    className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-all shadow-md"
                    onClick={() => setOpenDropdown(!openDropdown)}
                >
                    <User className="w-4 h-4 text-purple-400" />
                    {/* Email visible only on medium+ screens */}
                    <span className="hidden md:inline text-sm font-medium text-gray-200 truncate max-w-32">
                        {user?.email}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                {openDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-gray-900 border border-purple-700/50 rounded-lg shadow-lg z-40 animate-fadeIn">
                        <ul className="py-2 text-sm text-gray-200">
                            <li>
                                <Link
                                    to="/admin-profile"
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-purple-700/30 transition-colors"
                                >
                                    <User className="w-4 h-4 text-purple-400" /> Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-600/30 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Mobile side menu */}
            {openSideMenu && (
                <div className="fixed top-[73px] left-0 right-0 bg-gray-900 border-b border-purple-700/40 lg:hidden z-20">
                    <Sidebar activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
