import { useMatch, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function Auth() {
    const isLogin = useMatch("/login");
    const navigate = useNavigate();

    return (
        <main className="auth-page">
            {isLogin ? (
                <LoginForm onLoginSuccess={() => navigate("/")} onSwitchToSignup={() => navigate("/signup")} />
            ) : (
                <SignupForm onSignupSuccess={() => navigate("/login")} onSwitchToLogin={() => navigate("/login")} />
            )}
        </main>
    );
}
