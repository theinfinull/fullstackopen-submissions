export default function Total(props) {
    let total = 0;
    props.parts.forEach((part) => {
        total += part.exercises;
    });
    return <p>Total Number Of Exercises {total}</p>;
}
