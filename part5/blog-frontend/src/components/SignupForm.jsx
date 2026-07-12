import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signup } from "../services/auth";
import "../styles/Auth.css";

export default function SignupForm({ onSignupSuccess, onSwitchToLogin }) {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            await signup(username, name, password);
            setUsername("");
            setName("");
            setPassword("");
            onSignupSuccess?.();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>sign up</h2>

            <div className="auth-field">
                <label htmlFor="signup-username">username</label>
                <input
                    id="signup-username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                    required
                />
            </div>

            <div className="auth-field">
                <label htmlFor="signup-name">name</label>
                <input
                    id="signup-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    required
                />
            </div>

            <div className="auth-field">
                <div className="auth-label-row">
                    <label htmlFor="signup-password">password</label>
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
                    id="signup-password"
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
                {submitting ? "signing up..." : "sign up"}
            </button>

            {onSwitchToLogin && (
                <p className="auth-switch">
                    already have an account?{" "}
                    <button type="button" onClick={onSwitchToLogin}>
                        log in
                    </button>
                </p>
            )}
        </form>
    );
}
