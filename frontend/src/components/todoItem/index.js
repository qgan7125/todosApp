import { EDITICON } from "../../assets/editIcon";
import { DELETEICON } from "../../assets/deleteIcon";

const TodoItem = ({
    todo,
    isComplete,
    content,
    handleInputEdit,
    handleToggle,
    handleEdit,
    handleDelete
}) => {

    return (
        <li id={todo.id}>
            {
                !isComplete
                    ?
                    <>
                        {todo.isEdit ?
                            <input
                                className="todo__content--input"
                                onChange={handleInputEdit}
                                value={content || ""} />
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

                    </>
                    :
                    <>
                        <span className="todo__content-complete" onClick={handleToggle}>
                            {todo.content}
                        </span>

                    </>
            }
            <button className="btn--delete"
                onClick={handleDelete}>
                {DELETEICON}
            </button>
        </li >
    )
}

export default TodoItem;