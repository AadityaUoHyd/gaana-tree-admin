import {SIDE_MENU_DATA} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

const Sidebar = ({activeMenu}) => {
    const navigate = useNavigate();
    return (
        <div className="w-64 bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20 h-[calc(100vh-61px)]">
            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all duration-200 ${activeMenu === item.label ? 'bg-[#ca68de] text-white font-medium shadow-md hover:bg-[#ca68de]': 'hover:bg-gray-100'}`}
                    key={`menu_${index}`}>
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}
        </div>
    )
}

export default Sidebar;