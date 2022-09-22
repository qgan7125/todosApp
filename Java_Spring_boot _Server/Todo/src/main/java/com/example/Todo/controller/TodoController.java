package com.example.Todo.controller;

import com.example.Todo.model.Todo;
import com.example.Todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/todo")
@CrossOrigin
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping
    public HashMap<String, Object> add(@RequestBody Todo todo) {
        Todo newTodo = todoService.saveTodo(todo);
        HashMap<String, Object> map = new HashMap<>();
        map.put("message", "New Todo is added");
        map.put("id", newTodo.getId());
        return map;
    }

    @GetMapping
    public HashMap<String, List<Todo>> getAllTodos() {
        HashMap<String, List<Todo>> map = new HashMap<>();
        map.put("data", todoService.getAllTodos());
        return map;
    }

    @DeleteMapping("/{id}")
    public HashMap<String, Object> deleteTodo(@PathVariable("id") int id) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("message", "Delete %s successfully".formatted(id));
        map.put("id", id);
        todoService.deleteTodo(id);
        return map;
    }

    @PatchMapping("/{id}")
    public HashMap<String, Object> updateTodo(@PathVariable("id") int id, @RequestBody Todo todo) {
        todoService.updateTodo(id, todo);
        HashMap<String, Object> map = new HashMap<>();
        map.put("message", "Update %s successfully".formatted(id));
        map.put("id", id);
        return map;
    }
}
