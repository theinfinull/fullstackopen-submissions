import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Auth />}></Route>
                <Route path="/signup" element={<Auth />}></Route>

                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    );
}
