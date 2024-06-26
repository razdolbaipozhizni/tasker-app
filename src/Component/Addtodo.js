import React , { useState , useRef , useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { BiCalendarEvent } from 'react-icons/bi'
import DatePicker from './DatePicker'
import styled from 'styled-components'

const Input = styled.input`
  color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
  background-color: ${props => props.theme === 'dark' ? '#000000' : '#fff'};
`;

const Button = styled.button`
  color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
`;

const Addtodo = ({ submited , handInput , setDate , date , text, theme }) => {

    const cal = useRef()
    const [openCal, setOpenCal] = useState(false)
    const openCalendar = () => {
        setOpenCal( !openCal )
    }

    useEffect(() => {
            document.addEventListener("mousedown" , handleClick)
        return () => {
            document.removeEventListener("mousedown" , handleClick)
        }
    }, [])

    const handleClick = (e) => {
        if (!cal.current.contains(e.target)) {
            setOpenCal(false)
        }
    }

    return (
        <div className="add-todo">
            <form onSubmit={submited}>
                <Input 
                    onChange={handInput} 
                    type="text" 
                    value={text} 
                    placeholder="Добавим задачу..." 
                    theme={theme}
                />
                <Button theme={theme}><BiPlus /></Button>
            </form>

            <div ref={cal} className="calendar">
                <div className={`datepick ${openCal && "purple"}`} onClick={openCalendar}>
                     <BiCalendarEvent />
                </div>  
                {openCal && <DatePicker date={date} setDate={setDate} />}
            </div>
        </div>
    )
}

export default Addtodo
