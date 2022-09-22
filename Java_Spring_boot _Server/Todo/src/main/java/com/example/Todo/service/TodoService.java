package com.example.Todo.service;

import com.example.Todo.model.Todo;

import java.util.List;

public interface TodoService {

    public Todo saveTodo(Todo todo);
    public List<Todo> getAllTodos();

    public void deleteTodo(int id);

    public void updateTodo(int id, Todo todo);
}
