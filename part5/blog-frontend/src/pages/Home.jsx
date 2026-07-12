import { isAuthenticated } from "../services/auth";
import "../styles/Home.css";

export default function Home() {
    const authenticated = isAuthenticated();

    if (!authenticated) {
        return (
            <div className="home-page">
                <p className="home-info danger">please login to access this page</p>
            </div>
        );
    }

    return (
        <div className="home-page">
            <p className="home-info">app</p>
        </div>
    );
}
