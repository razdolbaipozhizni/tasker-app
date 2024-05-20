import React , { useState , useEffect } from 'react';
import styled from 'styled-components';
import Todos from './Todos';
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";

let isAll = true;
let isCompleted = false;
let isUncompleted = false;

const SidebarContainer = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.50s linear;
`;

const SidebarButton = styled.button`
  background: none;
  border: 2px solid #5D00A5;
  color: #5D00A5; // Вы можете убрать это, если стрелка должна быть другого цвета
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 349px; // Это значение может быть изменено, чтобы лучше соответствовать вашему layout
  transform: translateY(-50%); // Центрирование по вертикали
  font-size: 1.7rem;
  width: 40px;
  height: 80px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  padding-top: 5px; // Скорректировал стиль padding
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #5D00A5; // Цвет стрелки
  }
`;


const Sidebar = ({ todos , setCompleted , deleteHandle, onUpdateTask, theme }) => {
    const [openSidebar , setOpenSidebar] = useState(false);
    const [filterChecked , setfilterChecked ] = useState('Все');
    const [filteredTodos, setfilteredTodos] = useState(todos);

    const handleToggle = () => {
        setOpenSidebar(!openSidebar);
    };

    const filterCheck = (e) => {
        setfilterChecked(e.target.innerText);
    };

    const filteredTodo = () => {
        switch (filterChecked) {
            case "Выполненные":
                setfilteredTodos(todos.filter((todo) => todo.completed === true));
                isAll = false;
                isUncompleted = false;
                isCompleted = true;
                break;
            case "В процессе":
                setfilteredTodos(todos.filter((todo) => todo.completed === false));
                isAll = false;
                isUncompleted = true;
                isCompleted = false;
                break;
            case "Все":
                setfilteredTodos(todos);
                isAll = true;
                isUncompleted = false;
                isCompleted = false;
                break;
            default:
                setfilteredTodos(todos);
                break;
        }
    };

    useEffect(() => {
        filteredTodo();
    }, [todos, filterChecked]);

    return (
        <SidebarContainer className={`sidebar ${openSidebar && "display-sidebar"}`}>
            <h1>Todos</h1>
            <div className="filter-todos">
                <ul onClick={filterCheck}>
                    <li className={`${isAll && "active"}`}>Все</li>
                    <li className={`${isCompleted && "active"}`}>Выполненные</li>
                    <li className={`${isUncompleted && "active"}`}>В процессе</li>
                </ul>
            </div>
            <div className="sidebar-list">
                <ul>
                    {filteredTodos.map((todo) => {
                        return (
                            <Todos
                                key={todo.key}
                                text={todo.todo}
                                date={todo.date}
                                todo={todo}
                                deleteHandle={deleteHandle}
                                setCompleted={setCompleted}
                                onUpdateTask={onUpdateTask}
                                theme={theme}
                            />
                        );
                    })}
                </ul>
            </div>
            <SidebarButton onClick={handleToggle} className="toggle-sidebar">
                {openSidebar ? <BiChevronLeft /> : <BiChevronRight />}
            </SidebarButton>
        </SidebarContainer>
    );
};

export default Sidebar;
