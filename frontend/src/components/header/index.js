import LoginBtn from "../loginBtn";
import "./header.css";

const Header = () => {
    return (
        <div className="header__container">
            <header><h2>Todo list</h2></header>
            <LoginBtn />
        </div>
    )
}

export default Header;