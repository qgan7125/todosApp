import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./loginBtn.css";

const LoginBtn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const pathname = location.pathname.replace("/", "");

    const goToHome = () => navigate("/");
    const goToLogin = () => navigate("/login");
    const logout = () => {
        cookies.remove('jwt');
        navigate("/");
    }

    const btn = () => {
        return !pathname ?
            cookies.get('jwt') ?
                <button onClick={logout}>Logout</button>
                : <button onClick={goToLogin}>Login/Register</button>
            : <button onClick={goToHome}>Home</button>
    }

    return (
        <div className="LoginBtn__container">
            {
                btn()
            }

        </div>
    )
}

export default LoginBtn;