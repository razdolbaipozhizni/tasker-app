import React, { useState, useEffect } from 'react';
import './style.css';
import Addtodo from './Component/Addtodo';
import Todos from './Component/Todos';
import Sidebar from './Component/Sidebar';
import SearchBar from './Component/SearchBar';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './GlobalStyles';
import ThemeToggle from './Component/ThemeToggle';

const App = () => {
  const [date, setDate] = useState();
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [err, setErr] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    getLocalstorage();
  }, []);

  useEffect(() => {
    saveLs(todos);
  }, [todos]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let time = date && format(date, 'dd MMM yyyy', { locale: enGB });
    const id = Math.random() * 2;
    if (text === '') {
      setErr("Please enter a task");
      return;
    }
    if (time === undefined) {
      time = "today";
    }
    setTodos([...todos, { todo: text, date: time, completed: false, key: id }]);
    setDate();
    setText('');
    setErr('');
  };

  const saveLs = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalstorage = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLs = JSON.parse(localStorage.getItem('todos', JSON.stringify(todos)));
      setTodos(todoLs);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.key !== id));
  };

  const completedHandle = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.key === id) {
        return {
          ...todo, completed: !todo.completed
        };
      }
      return todo;
    }));
  };

  const handleUpdateTask = (taskId, newText) => {
    setTodos(todos.map(todo =>
      todo.key === taskId ? { ...todo, todo: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => 
    todo.todo.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="App">
          <header>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </header>
          <main>
            <SearchBar 
              searchText={searchText} 
              setSearchText={setSearchText} 
              theme={theme} 
            />
            <Addtodo
              submited={handleSubmit}
              handInput={handInput}
              setDate={setDate}
              date={date}
              text={text}
              theme={theme} // Передаем theme здесь
            />
            <p className="error">{err}</p>
            <ul className="todo-list">
              {filteredTodos.map((todo) => {
                return <Todos
                  key={todo.key}
                  text={todo.todo}
                  date={todo.date}
                  todo={todo}
                  setCompleted={completedHandle}
                  deleteHandle={deleteTodo}
                  onUpdateTask={handleUpdateTask}
                  theme={theme} // Передаем theme здесь
                />
              })}
            </ul>
          </main>
          <aside>
            <Sidebar
              todos={filteredTodos}
              setCompleted={completedHandle}
              deleteHandle={deleteTodo}
              onUpdateTask={handleUpdateTask}
              theme={theme} // Передаем theme здесь
            />
          </aside>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
