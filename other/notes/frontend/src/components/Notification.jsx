import { useEffect } from "react";
import { X } from "lucide-react";

function NotifItem({ item, onDismiss }) {
    useEffect(() => {
        const t = setTimeout(() => onDismiss(item.id), 3000);
        return () => clearTimeout(t);
    }, [item.id]);

    return (
        <div className={`notif-item ${item.type}`}>
            <span className="notif-dot" />
            <span className="notif-msg">{item.message}</span>
            <button className="notif-close" onClick={() => onDismiss(item.id)}>
                <X size={13} />
            </button>
        </div>
    );
}

export default function Notification({ notifications, onDismiss }) {
    if (!notifications.length) return null;

    return (
        <div className="notif-stack">
            {notifications.map((item) => (
                <NotifItem key={item.id} item={item} onDismiss={onDismiss} />
            ))}
        </div>
    );
}
