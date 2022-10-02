import { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
    const [formInfo, setFormInfo] = useState({});
    const cookies = new Cookies();
    const navigator = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleLogin = () => {
        fetch("http://localhost:8080/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formInfo)
        })
            .then(res => res.json())
            .then(res => {
                if (res.hasOwnProperty('jwt')) {
                    cookies.set('jwt', `Bearer ${res.jwt}` , { path: "/" });
                    navigator("/");
                }
            })
    }

    const handleInput = (e) => {
        const { id, value } = e.target;

        setFormInfo(prev => ({ ...prev, [id]: value }));
    }

    return (
        <main className="login__container">
            <form className="login__form" onSubmit={handleSubmit}>

                <h1>Login</h1>
                <div className="login__row">
                    <label>Username:</label>
                    <input id="username" placeholder="Your username..." onChange={handleInput} value={formInfo["username"] || ""} required />
                </div>
                <div className="login__row">
                    <label>Password:</label>
                    <input id="password" placeholder="Your password..." onChange={handleInput} value={formInfo["password"] || ""} required />
                </div>
                <div className="login__row">
                    <label>Email:</label>
                    <input id="email" type="email" placeholder="Your email..." onChange={handleInput} value={formInfo["email"] || ""} />
                </div>
                <div className="login__row">
                    <label>Age:</label>
                    <input id="age" type="number" max={100} placeholder="Your age..." onChange={handleInput} value={formInfo["age"] || ""} />
                </div>
                <div className="login__row btn__group">
                    <button onClick={handleLogin}>Login</button>
                    <button>Register</button>
                </div>
            </form>
        </main>
    )
}

export default LoginPage;