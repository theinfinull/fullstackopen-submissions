import { useState } from "react";
import PhoneBookView from "./components/PhoneBookView";
import PhoneBooksForm from "./components/PhoneBookForm";
import Notification from "./components/Notification";
import { useEffect } from "react";
import {
    createPerson,
    getAllPersons,
    removePerson,
    updatePerson,
} from "./services/persons";

export default function App() {
    const [persons, setPersons] = useState([]);
    const [notification, setNotification] = useState({});

    useEffect(() => {
        renderAllPersons();
    }, []);

    const NOTIFICATION_DURATION_MS = 3000;

    function notify(type, message) {
        setNotification({ type, message });

        setTimeout(() => {
            setNotification({});
        }, NOTIFICATION_DURATION_MS);
    }

    function renderAllPersons() {
        getAllPersons()
            .then((data) => {
                setPersons(data);
            })
            .catch((err) => {
                console.log("[ERR]: failed to fetch persons:" + err);
                notify("success", "failed to fetch persons");
            });
    }

    function deleteHandler(id) {
        removePerson(id).then(() => {
            renderAllPersons();
            notify("success", "person deleted successfully");
        });
    }

    // supports CREATE and EDIT
    function modifyHandler(name, number) {
        let action;
        const personExistsPerdicate = (person) =>
            person.name == name || person.number == number;
        if (persons.some(personExistsPerdicate)) {
            const id = persons.find(personExistsPerdicate)?.id;
            action = updatePerson(id, { name, number });
        } else {
            action = createPerson(name, number);
        }
        action.then(() => {
            notify("success", `${name} added/updated`);
            renderAllPersons();
        });
    }

    return (
        <div className="app">
            <h1>phonebook</h1>
            <h2>add name</h2>
            <PhoneBooksForm
                setPersons={setPersons}
                modifyHandler={modifyHandler}
                notify={notify}
            />
            <PhoneBookView persons={persons} deleteHandler={deleteHandler} />

            <Notification notification={notification}></Notification>
        </div>
    );
}
