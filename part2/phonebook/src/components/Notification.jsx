export default function Notification({ notification }) {
    const { type, message } = notification;
    console.log(`notification: type: ${type}, message ${message}`);
    if (type == null || message == null) {
        return <></>;
    } else {
        return (
            <div
                className={`notification ${type}`}
            >{`${type} : ${message}`}</div>
        );
    }
}
