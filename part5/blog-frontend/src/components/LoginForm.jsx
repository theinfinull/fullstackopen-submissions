import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../services/auth";
import "../styles/Auth.css";

export default function LoginForm({ onLoginSuccess, onSwitchToSignup }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            await login(username, password);
            setUsername("");
            setPassword("");
            onLoginSuccess?.();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>login</h2>

            <div className="auth-field">
                <label htmlFor="login-username">username</label>
                <input
                    id="login-username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                    required
                />
            </div>

            <div className="auth-field">
                <div className="auth-label-row">
                    <label htmlFor="login-password">password</label>
                    <button
                        type="button"
                        className="auth-toggle-visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "hide password" : "show password"}
                    >
                        {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                    </button>
                </div>
                <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="new-password"
                    required
                />
            </div>

            {error && (
                <p className="auth-error" role="alert">
                    {error}
                </p>
            )}

            <button type="submit" className="auth-submit" disabled={submitting}>
                {submitting ? "logging in..." : "log in"}
            </button>

            {onSwitchToSignup && (
                <p className="auth-switch">
                    don&apos;t have an account?{" "}
                    <button type="button" onClick={onSwitchToSignup}>
                        sign up
                    </button>
                </p>
            )}
        </form>
    );
}
