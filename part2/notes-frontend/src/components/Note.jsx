const Note = ({ content, isImportant }) => {
    return <li className={isImportant ? "important" : ""}>{content}</li>;
};

export default Note;
