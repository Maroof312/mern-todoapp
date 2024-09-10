import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTodos, createTodo, updateTodo, deleteTodo } from './actions/todoActions';

const App = () => {
  const dispatch = useDispatch();

  const todoList = useSelector((state) => state.todoList);
  const { loading, error, todos } = todoList;

  useEffect(() => {
    dispatch(listTodos());
  }, [dispatch]);

  const handleCreateTodo = (text) => {
    dispatch(createTodo(text));
  };

  const handleUpdateTodo = (id, todo) => {
    dispatch(updateTodo(id, todo));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h1>TODO List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <span>{todo.text}</span>
              <button onClick={() => handleUpdateTodo(todo._id, { ...todo, completed: !todo.completed })}>
                {todo.completed ? 'Unmark' : 'Complete'}
              </button>
              <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <input type="text" id="newTodo" placeholder="Enter new todo" />
      <button onClick={() => handleCreateTodo(document.getElementById('newTodo').value)}>Add Todo</button>
    </div>
  );
};

export default App;
