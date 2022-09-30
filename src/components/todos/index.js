import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { getTodos, addTodo, deleteTodo, patchTodo } from '../../Apis/restApis';
import TodoItem from '../todoItem';
import "./todo.css";

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const cookies = new Cookies();
    const [auth, setAuth] = useState(cookies.get('jwt'));

    useEffect(() => {
        getTodos((res) => {
            console.log("Get all data");
            setTodos(res.data);
        });
    }, [])

    useEffect(() => {
        const cookies = new Cookies();
        if (auth !== cookies.get('jwt')) {
            setAuth(cookies.get('jwt'));
        }
    }, [auth]);

    const handleInput = (e) => {
        const { value } = e.target;
        setInput(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) { return };

        const newContent = {
            content: input,
            isComplete: false,
            isEdit: false
        }

        addTodo((res) => {
            setTodos(prev => [...prev, { ...newContent, id: res.id }])
            setInput("")
        }, newContent)
    }

    const handleDelete = async (e) => {
        const { id } = e.target.parentElement;

        deleteTodo(id, (res) => {
            const idx = todos.findIndex(todo => +todo.id === +id);
            setTodos(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
            console.log(res.message)
        })
    }

    const handleEdit = (e) => {
        const { id } = e.target.parentElement;
        const EditIdx = todos.findIndex(todo => +todo.id === +id);
        const newData = { ...todos[EditIdx], isEdit: !todos[EditIdx]['isEdit'] };

        patchTodo(id, newData, (res) => {
            console.log(res.message)
            setTodos(prev => [...prev.slice(0, EditIdx), { ...todos[EditIdx], isEdit: !todos[EditIdx]['isEdit'] }, ...prev.slice(EditIdx + 1)])
        });
    }

    const handleInputEdit = (e) => {
        const { id } = e.target.parentElement;
        const { value } = e.target;
        const idx = todos.findIndex(todo => +todo.id === +id);

        setTodos(prev => [...prev.slice(0, idx), { ...prev[idx], content: value }, ...prev.slice(idx + 1)])
    }

    const handleToggle = (e) => {
        const { id } = e.target.parentElement;
        const idx = todos.findIndex(todo => +todo.id === +id);
        const newContent = { isComplete: !todos[idx]["isComplete"] };


        patchTodo(id, newContent, (res) => {
            console.log(res.message)
            setTodos(prev => [...prev.slice(0, idx), { ...todos[idx], isComplete: !todos[idx]["isComplete"] }, ...prev.slice(idx + 1)])
        });
    }

    const active = todos?.sort((a, b) => +b.id - +a.id).filter((todo) => !todo.isComplete);
    const completed = todos?.sort((a, b) => +b.id - +a.id).filter((todo) => todo.isComplete);

    return (
        <div className="todo__container" >
            <form className='todo__form' onSubmit={handleSubmit}>
                <div className='todo__form--inputGroup'>
                    <input onChange={handleInput} value={input} />
                    <button className='btn__submit'>Submit</button>
                </div>
            </form>
            <div className='todo__list-container'>
                <ul className="todo__list" >
                    {active.length !== 0
                        ?
                        active.map((todo, i) =>
                            <TodoItem
                                key={i}
                                todo={todo}
                                isComplete={false}
                                content={todos.filter((t) => +t.id === +todo.id)[0].content}
                                handleInputEdit={handleInputEdit}
                                handleToggle={handleToggle}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete} />)
                        :
                        <span className='span__noactive'>No active task</span>
                    }

                </ul>
                <ul className="todo__list">
                    {completed && completed.map((todo, i) =>
                        <TodoItem
                            key={i}
                            todo={todo}
                            isComplete={true}
                            handleInputEdit={handleInputEdit}
                            handleToggle={handleToggle}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete} />)}
                </ul>
            </div>
        </div >
    )
}

export default Todos;