import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { fetchAllTodos } from "../../redux/reducers/todoSlice";
import "./loginBtn.css";

const LoginBtn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [auth, setAuth] = useState(cookies.get('jwt') ? true : false);
    const pathname = location.pathname.replace("/", "");

    const goToHome = () => {
        navigate("/");
        dispatch(fetchAllTodos());
    };

    const goToLogin = () => {
        navigate("/login");
        setAuth(true);
    }
    const logout = () => {
        cookies.remove('jwt');
        setAuth(false);
        dispatch(fetchAllTodos());
    }

    const btn = () => {
        return !pathname ?
            auth ?
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