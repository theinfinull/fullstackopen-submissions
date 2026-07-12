import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../services/auth";
import "../styles/Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();
    const authenticated = isAuthenticated();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <nav className="navbar">
            <NavLink to="/" className="navbar-brand">
                <img src="/favicon.png" alt="" className="navbar-logo" />
                blog
            </NavLink>

            {authenticated ? (
                <button type="button" className="navbar-button danger" onClick={handleLogout}>
                    log out
                </button>
            ) : (
                <NavLink to="/signup" className="navbar-button">
                    login / signup
                </NavLink>
            )}
        </nav>
    );
}
