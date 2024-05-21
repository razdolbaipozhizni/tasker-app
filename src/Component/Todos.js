import React, { useState, useRef, useEffect } from 'react';
import { BiCheck, BiX, BiEdit, BiStar, BiCalendarEvent, BiUpArrow, BiDownArrow } from "react-icons/bi";
import styled from 'styled-components';
import DatePicker from './DatePicker';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

const Button = styled.button`
  color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
`;

const ImportantButton = styled(Button)`
  color: ${props => props.important ? '#5D00A5' : (props.theme === 'dark' ? '#fff' : '#000')};
`;

const EditInput = styled.input`
  color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
  background-color: ${props => props.theme === 'dark' ? '#333' : '#fff'};
  border: 1px solid ${props => props.theme === 'dark' ? '#555' : '#ccc'};
  border-radius: 4px;
  padding: 5px;
  margin-right: 80px;
  width: calc(100% - 120px);
  box-sizing: border-box;
`;

const CalendarIcon = styled(BiCalendarEvent)`
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.5em;
`;

const Todos = ({ text, date, todo, setCompleted, deleteHandle, onUpdateTask, theme, toggleImportant, updateDate, moveTask }) => {
    const [editing, setEditing] = useState(false);
    const [newText, setNewText] = useState(text);
    const [openCal, setOpenCal] = useState(false);
    const [newDate, setNewDate] = useState(date === 'today' ? new Date() : new Date(date));

    const cal = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (cal.current && !cal.current.contains(e.target)) {
                setOpenCal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cal]);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        onUpdateTask(todo.key, newText);
        updateDate(todo.key, newDate);
        setEditing(false);
    };

    const handleTextChange = (e) => {
        setNewText(e.target.value);
    };

    const openCalendar = () => {
        setOpenCal(!openCal);
    };

    return (
        <div>
            <li className="todos">
                <div className={`text ${todo.completed ? "completed" : ""}`}>
                    {editing ? (
                        <>
                            <EditInput
                                type="text"
                                value={newText}
                                onChange={handleTextChange}
                                theme={theme}
                            />
                            <div ref={cal} className="calendar" style={{ display: 'inline-block', position: 'relative' }}>
                                <CalendarIcon onClick={openCalendar} />
                                {openCal && <div style={{ position: 'absolute', zIndex: 1 }}><DatePicker date={newDate} setDate={setNewDate} /></div>}
                            </div>
                        </>
                    ) : (
                        <h3>{text}</h3>
                    )}
                </div>
                <div className="meta">
                    <p className="todo-date">{date === 'today' ? format(new Date(), 'dd MMM yyyy', { locale: enGB }) : date}</p>
                    <ImportantButton onClick={() => toggleImportant(todo.key)} important={todo.important} theme={theme}> <BiStar /> </ImportantButton>
                    <Button onClick={() => moveTask(todo.key, 'up')} theme={theme}> <BiUpArrow /> </Button>
                    <Button onClick={() => moveTask(todo.key, 'down')} theme={theme}> <BiDownArrow /> </Button>
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
