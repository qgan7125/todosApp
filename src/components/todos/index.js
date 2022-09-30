import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoById, updateById, editTodoContent, fetchAllTodos } from '../../redux/reducers/todoSlice';
import TodoItem from '../todoItem';
import AddForm from '../todosForm';
import "./todo.css";

const Todos = () => {
    const todos = useSelector(state => state.todos.result);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllTodos());
    }, [dispatch])


    const handleDelete = async (e) => {
        const { id } = e.target.parentElement;
        dispatch(deleteTodoById(id));
    }

    const handleEdit = (e) => {
        const { id } = e.target.parentElement;
        const EditIdx = todos.findIndex(todo => +todo.id === +id);
        const newData = { ...todos[EditIdx], isEdit: !todos[EditIdx]['isEdit'] };

        dispatch(updateById({id, newData}));
    }

    const handleInputEdit = (e) => {
        const { id } = e.target.parentElement;
        const { value } = e.target;
        
        dispatch(editTodoContent({id, value}));
    }

    const handleToggle = (e) => {
        const { id } = e.target.parentElement;
        const idx = todos.findIndex(todo => +todo.id === +id);
        const newData = { ...todos[idx], isComplete: !todos[idx]["isComplete"] };

        dispatch(updateById({id, newData}));
    }

    const active = [...todos]?.sort((a, b) => +b.id - +a.id).filter((todo) => !todo.isComplete);
    const completed = [...todos]?.sort((a, b) => +b.id - +a.id).filter((todo) => todo.isComplete);

    return (
        <div className="todo__container" >
            <AddForm />
            <div className='todo__list-container'>
                <ul className="todo__list" >
                    {active.length !== 0
                        ?
                        active.map((todo, i) =>
                            <TodoItem
                                key={i}
                                todo={todo}
                                isComplete={false}
                                content={[...todos].filter((t) => +t.id === +todo.id)[0].content}
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