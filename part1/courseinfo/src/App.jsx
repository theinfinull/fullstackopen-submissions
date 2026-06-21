import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const App = () => {
    const course = "half stack application development";
    const part1 = "fundamentals of react";
    const exercises1 = 10;
    const part2 = "using props to pass data";
    const exercises2 = 7;
    const part3 = "state of a component";
    const exercises3 = 14;

    return (
        <div>
            <Header course={course}></Header>
            <Content
                part1={part1}
                exercises1={exercises1}
                part2={part2}
                exercises2={exercises2}
                part3={part3}
                exercises3={exercises3}
            ></Content>
            <Total total={exercises1 + exercises2 + exercises3}></Total>
        </div>
    );
};

export default App;
