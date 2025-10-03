import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Login from "./pages/Login.jsx";
import AddSong from "./pages/AddSong.jsx";
import ListSong from "./pages/ListSong.jsx";
import AddAlbum from "./pages/AddAlbum.jsx";
import ListAlbum from "./pages/ListAlbum.jsx";
import AdminProfile from "./pages/AdminProfile.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Toaster position="top-center" />
                <Routes>
                    {/* Define your routes here */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/add-song" element={
                        <ProtectedRoute requireAdmin={true}>
                            <AddSong />
                        </ProtectedRoute>
                    } />
                    <Route path="/list-songs" element={
                        <ProtectedRoute requireAdmin={true}>
                            <ListSong />
                        </ProtectedRoute>
                    } />
                    <Route path="/add-album" element={
                        <ProtectedRoute requireAdmin={true}>
                            <AddAlbum />
                        </ProtectedRoute>
                    } />
                    <Route path="/list-albums" element={
                        <ProtectedRoute requireAdmin={true}>
                            <ListAlbum />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin-profile" element={
                        <ProtectedRoute requireAdmin={true}>
                            <AdminProfile />
                        </ProtectedRoute>
                    } />
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={
                        <ProtectedRoute requireAdmin={true}>
                            <AddSong />
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;