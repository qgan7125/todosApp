package com.example.Todo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String content;
    private Boolean isComplete = false;
    private Boolean isEdit = false;

    public Todo() {

    }
    public Todo(int id, String content) {
        this.id = id;
        this.content = content;
    }

    public Todo(int id, String content, Boolean isComplete, Boolean isEdit) {
        this.id = id;
        this.content = content;
        this.isComplete = isComplete;
        this.isEdit = isEdit;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getIsComplete() {
        return isComplete;
    }

    public void setIsComplete(Boolean complete) {
        isComplete = complete;
    }

    public Boolean getIsEdit() {
        return isEdit;
    }

    public void setIsEdit(Boolean edit) {
        isEdit = edit;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", isComplete=" + isComplete +
                ", isEdit=" + isEdit +
                '}';
    }
}
