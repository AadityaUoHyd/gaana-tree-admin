import {assets} from "../assets/assets.js";
import {Lock, Mail} from "lucide-react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useAuth} from "../context/AuthContext.jsx";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {login, isAuthenticated, loading: authLoading} = useAuth();

    // Redirect if already authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated()) {
            navigate('/add-song', {replace: true});
        }
    }, [authLoading, isAuthenticated, navigate]);

    if (isAuthenticated()) {
        return null;
    }

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-400"></div>
            </div>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password) {
            toast.error("Please fill in all details");
            return;
        }

        setLoading(true);
        try {
            const result = await login(email, password);
            if(result.success) {
                toast.success("Admin logged in successfully!");
                navigate("/add-song");
            } else {
                toast.error(result.message);
            }
        }catch(err) {
            toast.error(err.message);
        }finally {
            setLoading(false);
        }
    }

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.3),transparent_60%)] opacity-50"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=&quot;80&quot; height=&quot;80&quot; viewBox=&quot;0 0 80 80&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23FFFFFF&quot; fill-opacity=&quot;0.08&quot;%3E%3Cpath d=&quot;M50 50c0-5.52-4.48-10-10-10s-10 4.48-10 10 4.48 10 10 10 10-4.48 10-10zm-30-30c0-5.52-4.48-10-10-10S0 14.48 0 20s4.48 10 10 10 10-4.48 10-10zm60 0c0-5.52-4.48-10-10-10s-10 4.48-10 10 4.48 10 10 10 10-4.48 10-10z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            
            <div className="max-w-lg w-full space-y-10 relative z-10">
                {/* Header */}
                <div className="text-center">
                    <div className="flex items-center justify-center mb-8">
                        <img 
                            src={assets.logo} 
                            alt="logo" 
                            className="h-16 w-16 transform hover:scale-110 transition-transform duration-500 ease-out" 
                        />
                        <h1 className="ml-4 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight">
                            GaanaTree
                        </h1>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3 tracking-wider">Admin Panel</h2>
                    <p className="text-gray-200 text-base font-medium italic opacity-80">
                        Admin Login to manage your music library
                    </p>
                </div>
                {/* Login form */}
                <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10 transform hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Email field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-100 mb-3">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-6 w-6 text-gray-300 group-hover:text-purple-300 transition-colors duration-300" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    required
                                    className="block w-full pl-12 pr-4 py-4 border border-gray-500 rounded-xl bg-gray-900/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 group-hover:bg-gray-900/50 text-lg"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-100 mb-3">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-6 w-6 text-gray-300 group-hover:text-purple-300 transition-colors duration-300" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="password"
                                    required
                                    className="block w-full pl-12 pr-4 py-4 border border-gray-500 rounded-xl bg-gray-900/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 group-hover:bg-gray-900/50 text-lg"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>
                        {/* Login button */}
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-98"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-3"></div>
                                    Signing in...
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;