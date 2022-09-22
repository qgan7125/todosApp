package com.example.Todo.service;

import com.example.Todo.model.Todo;
import com.example.Todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoServiceImp implements TodoService{

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public Todo saveTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @Override
    public void deleteTodo(int id) {
        todoRepository.deleteById(id);
    }

    @Override
    public void updateTodo(int id, Todo todo) {
        Todo oldTodo = todoRepository.getReferenceById(id);
        oldTodo.setContent(todo.getContent());
        oldTodo.setIsComplete(todo.getIsComplete());
        oldTodo.setIsEdit(todo.getIsEdit());
        todoRepository.save(oldTodo);
    }
}
