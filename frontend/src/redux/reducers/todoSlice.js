import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos, addTodo, deleteTodo, patchTodo } from '../../Apis/restApis';

const initialState = {
    newTodo: "",
    result: []
}

export const fetchAllTodos = createAsyncThunk(
    "todo/fetchAllTodos",
    async (_, thunkAPI) => {
        const res = await getTodos();
        return res.data;
    }
)

export const addTodoThunk = createAsyncThunk(
    "todo/addTodoThunk",
    async (todo, thunkAPI) => {
        const res = await addTodo(todo);
        return res;
    }
)

export const deleteTodoById = createAsyncThunk(
    "todo/deleteTodoById",
    async (id, thunkAPI) => {
        const res = await deleteTodo(id);
        console.log(res.message);
        return id;
    }
)

export const updateById = createAsyncThunk(
    "todo/updateById",
    async ({ id, newData }, thunkAPI) => {
        const res = await patchTodo(id, newData);
        console.log(res.message);
        return {id, newData};
    }
)

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        inputTodo: (state, action) => {
            state.newTodo = action.payload;
        },
        editTodoContent: (state, action) => {
            const { id, value } = action.payload;
            const idx = state.result.findIndex(todo => +todo.id === +id);
            state.result = [...state.result.slice(0, idx), { ...state.result[idx], content: value }, ...state.result.slice(idx + 1)];
        }
    },
    extraReducers: {
        [fetchAllTodos.fulfilled]: (state, action) => {
            state.result = action.payload;
        },
        [fetchAllTodos.rejected]: (state, action) => {
            console.log("Get data rejected");
        },
        [addTodoThunk.fulfilled]: (state, action) => {
            state.result = [...state.result, action.payload];
        },
        [addTodoThunk.rejected]: (state, action) => {
            console.log("Add todo rejected");
        },
        [deleteTodoById.fulfilled]: (state, action) => {
            const id = action.payload;
            const idx = state.result.findIndex(todo => +todo.id === +id);
            state.result = [...state.result.slice(0, idx), ...state.result.slice(idx + 1)];
        },
        [deleteTodoById.rejected]: (state, action) => {
            console.log("Delete todo rejected");
        },
        [updateById.fulfilled]: (state, action) => {
            const { id, newData } = action.payload;
            const idx = state.result.findIndex(todo => +todo.id === +id);
            state.result = [...state.result.slice(0, idx), newData, ...state.result.slice(idx + 1)]
        },
        [updateById.rejected]: (state, action) => {
            console.log(`Edit todo ${action.payload} rejected`);
        }
    }
})

export const { inputTodo, editTodoContent } = todoSlice.actions;

export default todoSlice.reducer;