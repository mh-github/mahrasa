/* global window */

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Todo from './Todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

const Editor = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/todos.json');
        if (!response.ok) throw Error(response.statusText);

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        handleAjaxError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      const response = await window.fetch('/api/todos.json', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw Error(response.statusText);

      const savedTodo = await response.json();
      const newTodos = [...todos, savedTodo];
      setTodos(newTodos);
      success('Todo Added!');
      navigate(`/todos/${savedTodo.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const deleteTodo = async (todoId) => {
    const sure = window.confirm('Are you sure?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/todos/${todoId}.json`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);

        success('Todo Deleted!');
        navigate('/todos');
        setTodos(todos.filter(todo => todo.id !== todoId));
      } catch (error) {
        handleAjaxError(error);
      }
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      const response = await window.fetch(
        `/api/todos/${updatedTodo.id}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedTodo),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw Error(response.statusText);

      const newTodos = todos;
      const idx = newTodos.findIndex((todo) => todo.id === updatedTodo.id);
      newTodos[idx] = updatedTodo;
      setTodos(newTodos);

      success('Todo Updated!');
      navigate(`/todos/${updatedTodo.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <div className="grid">
          <TodoList todos={todos} />

          <Routes>
            <Route
              path=":id"
              element={<Todo todos={todos} onDelete={deleteTodo} />}
            />
            <Route
              path=":id/edit"
              element={<TodoForm todos={todos} onSave={updateTodo} />}
            />
            <Route path="new" element={<TodoForm onSave={addTodo} />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default Editor;
