import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const App = () => {
    const course = "half stack application development";
    const parts = [
        {
            name: "fundamentals of react",
            exercises: 10,
        },
        {
            name: "using props to pass data",
            exercises: 7,
        },
        {
            name: "state of a component",
            exercises: 14,
        },
    ];
    return (
        <div>
            <Header course={course}></Header>
            <Content parts={parts}></Content>
            <Total parts={parts}></Total>
        </div>
    );
};

export default App;
