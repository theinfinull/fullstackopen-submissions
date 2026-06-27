import Content from "./componenets/Content";
import Header from "./componenets/Header";
import Total from "./componenets/Total";

const App = () => {
    const courses = [
        {
            id: 1,
            name: "quarter stack application development",
            parts: [
                {
                    id: 1,
                    name: "fundamentals of js",
                    exercises: 10,
                },
                {
                    id: 2,
                    name: "using js classes and objects",
                    exercises: 7,
                },
                {
                    id: 3,
                    name: "misc",
                    exercises: 14,
                },
            ],
        },
        {
            id: 2,
            name: "half stack application development",
            parts: [
                {
                    id: 1,
                    name: "fundamentals of react",
                    exercises: 10,
                },
                {
                    id: 2,
                    name: "using props to pass data",
                    exercises: 7,
                },
                {
                    id: 3,
                    name: "state of a component",
                    exercises: 14,
                },
            ],
        },
    ];

    return (
        <div className="app">
            {courses.map((course) => (
                <div key={course.id} className="course">
                    <Header course={course.name.toUpperCase()} />
                    <Content parts={course.parts} />
                    <Total
                        total={course.parts.reduce((total, part) => {
                            return total + part.exercises;
                        }, 0)}
                    />
                </div>
            ))}
        </div>
    );
};

export default App;
