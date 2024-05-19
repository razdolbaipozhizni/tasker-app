import React, { useState } from 'react';
import { BiCheck, BiX, BiEdit } from "react-icons/bi";
import styled from 'styled-components';

const Button = styled.button`
  color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
`;

const Todos = ({ text, date, todo, setCompleted, deleteHandle, onUpdateTask, theme }) => {
    const [editing, setEditing] = useState(false);
    const [newText, setNewText] = useState(text);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        onUpdateTask(todo.key, newText);
        setEditing(false);
    };

    const handleTextChange = (e) => {
        setNewText(e.target.value);
    };

    return (
        <div>
            <li className="todos">
                <div className={`text ${todo.completed ? "completed" : ""}`}>
                    {editing ? (
                        <input
                            type="text"
                            value={newText}
                            onChange={handleTextChange}
                            style={{ color: theme === 'dark' ? '#fff' : '#000', backgroundColor: theme === 'dark' ? '#333' : '#fff' }}
                        />
                    ) : (
                        <h3>{text}</h3>
                    )}
                </div>
                <div className="meta">
                    <p className="todo-date">{date}</p>
                    <Button onClick={() => setCompleted(todo.key)} theme={theme}> <BiCheck /> </Button>
                    <Button onClick={() => deleteHandle(todo.key)} theme={theme}> <BiX /></Button>
                    {editing ? (
                        <Button onClick={handleSaveClick} theme={theme}>Save</Button>
                    ) : (
                        <Button onClick={handleEditClick} theme={theme}> <BiEdit /> </Button>
                    )}
                </div>
            </li>
        </div>
    );
};

export default Todos;
