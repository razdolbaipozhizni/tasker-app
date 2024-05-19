import React , { useState , useEffect } from 'react'
import Todos from './Todos'
import { BiChevronRight } from "react-icons/bi";
import { BiChevronLeft } from "react-icons/bi";

let isAll = true
let isCompleted = false
let isUncompleted = false
const Sidebar = ({ todos , setCompleted , deleteHandle, onUpdateTask, theme }) => {
    const [openSidebar , setOpenSidebar] = useState(false)
    const [filterChecked , setfilterChecked ] = useState('Все')
    const [filteredTodos, setfilteredTodos] = useState(todos)

    const handleToggle = () => {
        setOpenSidebar( !openSidebar )
    }

    const filterCheck = (e) =>{
        setfilterChecked(e.target.innerText)
    }
    const filteredTodo = () => {
        switch (filterChecked) {
            case "Выполненные":
                setfilteredTodos(todos.filter((todo) => todo.completed === true))
                isAll = false
                isUncompleted = false
                isCompleted = true
                break;
            case "В процессе":
                setfilteredTodos(todos.filter((todo) => todo.completed === false))
                isAll = false
                isUncompleted = true
                isCompleted = false
                break;
            case "Все":
                setfilteredTodos(todos)
                isAll = true
                isUncompleted = false
                isCompleted = false
                break;
            default:
                setfilteredTodos(todos)
                break;
        }
    }
    useEffect(() => {
        filteredTodo()
    }, [todos , filterChecked ])

    return (
        <div className={`sidebar ${openSidebar && "display-sidebar"}`}>
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
                {filteredTodos.map((todo)=>{
                    return <Todos
                    key={todo.key}
                    text={todo.todo} 
                    date={todo.date} 
                    todo={todo}
                    deleteHandle={deleteHandle}
                    setCompleted={setCompleted}
                    onUpdateTask={onUpdateTask}
                    theme={theme} // Передаем theme здесь
                />

                })}
            </ul>
            </div>
            <button onClick={handleToggle} className="toggle-sidebar">{openSidebar ? <BiChevronLeft/> : <BiChevronRight /> }</button>
        </div>
    )
}

export default Sidebar
