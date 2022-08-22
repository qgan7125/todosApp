import React, { useEffect, useState } from 'react';
import "./todo.css";

// The SVG images
const EDITICON = <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>;
const DELETEICON = <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>;

const API = "http://localhost:4000/todos";

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            fetch(API)
                .then(res => res.json())
                .then(res => {
                    setTodos(res.data)
                })
        }

        fetchData();
    }, [])

    const handleInput = (e) => {
        const { value } = e.target;
        setInput(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) { return };

        const newContent = {
            content: input,
            isCompleted: false,
            isEdit: false
        }

        fetch(API, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContent)
        })
            .then(res => res.json())
            .then(res => {
                setTodos(prev => [...prev, { ...newContent, id: res.id }])
                setInput("")
            })
    }

    const handleDelete = async (e) => {
        const { id } = e.target.parentElement;

        fetch(API + `/${id}`, {
            method: "delete"
        })
            .then(res => res.json())
            .then(res => {
                const idx = todos.findIndex(todo => +todo.id === +res.id)
                setTodos(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)])
                console.log(res.message)
            })
    }

    const handleEdit = (e) => {
        const { id } = e.target.parentElement;
        const EditIdx = todos.findIndex(todo => +todo.id === +id);
        const newData = { ...todos[EditIdx], isEdit: !todos[EditIdx]['isEdit'] }

        fetch(API, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.message)
                setTodos(prev => [...prev.slice(0, EditIdx), newData, ...prev.slice(EditIdx + 1)])
            })
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
        const newContent = { ...todos[idx], isCompleted: !todos[idx]["isCompleted"] }

        fetch(API, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContent)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.message);
                setTodos(prev => [...prev.slice(0, idx), newContent, ...prev.slice(idx + 1)])
            })
    }

    const active = todos?.sort((a, b) => +b.id - +a.id).filter((todo) => !todo.isCompleted);
    const completed = todos?.sort((a, b) => +b.id - +a.id).filter((todo) => todo.isCompleted);

    return (
        <div className="todo__container" >
            <header><h3>Todo list</h3></header>
            <form className='todo__form' onSubmit={handleSubmit}>
                <div className='todo__form--inputGroup'>
                    <input onChange={handleInput} value={input} />
                    <button className='btn__submit'>Submit</button>
                </div>
            </form>
            <div className='todo__list-container'>
                <ul className="todo__list" >
                    {active.length !== 0 ?
                        active.map((todo, i) => {
                            return <li key={i} id={todo.id} >
                                {todo.isEdit ?
                                    <input
                                        className="todo__content--input"
                                        onChange={handleInputEdit}
                                        value={todos.filter((t) => +t.id === +todo.id)[0].content} />
                                    :
                                    <span onClick={handleToggle}>
                                        {todo.content}
                                    </span>
                                }

                                <button
                                    className="btn--modify"
                                    onClick={handleEdit}>
                                    {EDITICON}
                                </button>
                                <button
                                    className="btn--delete"
                                    onClick={handleDelete}>
                                    {DELETEICON}
                                </button>
                            </li>
                        }) :
                        <span className='span__noactive'>No active task</span>
                    }

                </ul>
                <ul className="todo__list">
                    {completed && completed.map((todo, i) => {
                        return <li key={i} id={todo.id} >
                            <span className="todo__content-complete" onClick={handleToggle}>
                                {todo.content}
                            </span>
                            <button className="btn--delete"
                                onClick={handleDelete}>
                                {DELETEICON}
                            </button>
                        </li>
                    })}
                </ul>
            </div>
        </div >
    )
}

export default Todos;