import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const notes = [
    {
        id: 1,
        content: "point one",
        important: true,
    },
    {
        id: 2,
        content: "point two",
        important: false,
    },
    {
        id: 3,
        content: "point three",
        important: true,
    },
];

const filters = ["all", "important", "not important"];

ReactDOM.createRoot(document.getElementById("root")).render(
    <App initialNotes={notes} filters={filters} />,
);
