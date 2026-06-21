import Part from "./Part";

export default function Content(props) {
    return (
        <div>
            {props.parts.map((part) => {
                return (
                    <Part
                        key={part.name}
                        name={part.name}
                        exercises={part.exercises}
                    ></Part>
                );
            })}
        </div>
    );
}
