import { useDispatch, useSelector } from "react-redux";
import { addTodoThunk, inputTodo } from "../../redux/reducers/todoSlice";

const AddForm = () => {
    const input = useSelector(state => state.todos.newTodo);
    const dispatch = useDispatch();

    const handleInput = (e) => {
        const { value } = e.target;
        dispatch(inputTodo(value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTodoThunk({
            content: input,
            isComplete: false,
            isEdit: false
        }));
        dispatch(inputTodo(""));
    }

    return (
        <form className='todo__form' onSubmit={handleSubmit}>
            <div className='todo__form--inputGroup'>
                <input onChange={handleInput} value={input} />
                <button className='btn__submit'>Submit</button>
            </div>
        </form>
    )
}

export default AddForm;