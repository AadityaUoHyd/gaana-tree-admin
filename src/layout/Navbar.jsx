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
        <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
            {/* Left side menu button and title */}
            <div className="flex items-center gap-5">
                <button
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                    className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors">
                    {openSideMenu ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
                </button>

                <div className="flex items-center gap-2">
                    <img src={assets.logo} alt="logo" className="w-12 h-12" />
                    <span className="text-2xl font-bold text-black truncate">GaanaTree</span>
                </div>
            </div>

            {/* Right side - Admin dropdown */}
            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
                <div
                    className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg cursor-pointer"
                    onClick={() => setOpenDropdown(!openDropdown)}
                >
                    <User className="w-4 h-4 text-gray-600" />
                    {/* Email visible only on medium+ screens */}
                    <span className="hidden md:inline text-sm font-medium text-gray-700 truncate max-w-32">
                        {user?.email}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                {openDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                        <ul className="py-2 text-sm text-gray-700">
                            <li>
                                <Link
                                    to="/admin-profile"
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                >
                                    <User className="w-4 h-4 text-blue-500" /> Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
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
                <div className="fixed top-[73px] left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20">
                    <Sidebar activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
