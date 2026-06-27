export default function Part({name, exercises}) {
    return (
        <div className="part">
            <span>{name}</span>
            <span className="exercises">{exercises}</span>
        </div>
    );
}
