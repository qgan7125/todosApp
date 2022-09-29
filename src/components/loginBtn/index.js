import { useLocation, useNavigate } from "react-router-dom";
import "./loginBtn.css";

const LoginBtn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname.replace("/", "");

    const goToHome = () => navigate("/");
    const goToLogin = () => navigate("/login");

    return (
        <div className="LoginBtn__container">
            {
                !pathname ? <button onClick={goToLogin}>Login/Register</button> : <button onClick={goToHome}>Home</button>
            }

        </div>
    )
}

export default LoginBtn;