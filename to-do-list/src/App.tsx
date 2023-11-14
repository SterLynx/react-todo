// src/App.tsx

import React, { useState } from 'react';
import './App.css';
import Navbar from './navbar';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoItem: React.FC<{ todo: Todo; onToggle: (id: number) => void; onRemove: (id: number) => void }> = ({ todo, onToggle, onRemove }) => (
  <li key={todo.id}>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => onToggle(todo.id)}
    />
    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {todo.text}
    </span>
    <button onClick={() => onRemove(todo.id)}>Remove</button>
  </li>
);

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem: Todo = { id: Date.now(), text: newTodo, completed: false };
      setTodos((prevTodos) => [...prevTodos, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text" placeholder='Write a task to the list'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
          />
        ))}
      </ul>
    </div>
    
  );
};

export default TodoList;
