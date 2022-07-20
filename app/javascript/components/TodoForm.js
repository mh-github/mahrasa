import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Pikaday from 'pikaday';
import PropTypes from 'prop-types';
import TodoNotFound from './TodoNotFound';
import { formatDate, isEmptyObject, validateTodo } from '../helpers/helpers';

import 'pikaday/css/pikaday.css';

const TodoForm = ({ todos, onSave }) => {
  const { id } = useParams();

  const initialTodoState = useCallback(
    () => {
      const defaults = {
        title: '',
        published: false,
      };
      const currTodo = id ? todos.find((e) => e.id === Number(id)) : {};
      return { ...defaults, ...currTodo }
    },
    [todos, id]
  );

  const [todo, setTodo] = useState(initialTodoState);
  const [formErrors, setFormErrors] = useState({});
  const dateInput = useRef(null);

  const updateTodo = (key, value) => {
    setTodo((prevTodo) => ({ ...prevTodo, [key]: value }));
  };

  useEffect(() => {
    const p = new Pikaday({
      field: dateInput.current,
      toString: date => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateTodo('todo_date', formattedDate);
      },
    });

    // Return a cleanup function.
    // React will call this prior to unmounting.
    return () => p.destroy();
  }, []);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    updateTodo(name, value);
  };

  useEffect(() => {
    setTodo(initialTodoState);
  }, [todos, initialTodoState]);

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) return null;

    return (
      <div className="errors">
        <h3>The following errors prohibited the todo from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateTodo(todo);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(todo);
    }
  };

  const cancelURL = todo.id ? `/todos/${todo.id}` : '/todos';
  const title = todo.id ? `${todo.title} - ${todo.complete}` : 'New Todo';

  if (id && !todo.id) return <TodoNotFound />;

  return (
    <div>
      <h2>{title}</h2>
      {renderErrors()}

      <form className="todoForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            <strong>Title:</strong>
            <textarea
              cols="30"
              rows="10"
              id="title"
              name="title"
              onChange={handleInputChange}
              value={todo.title}
            />
          </label>
        </div>
        
        <div>
          <label htmlFor="complete">
            <strong>Complete:</strong>
            <input
              type="checkbox"
              id="complete"
              name="complete"
              onChange={handleInputChange}
              checked={todo.complete}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
          <Link to={cancelURL}>Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;

TodoForm.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
};

TodoForm.defaultProps = {
  todos: [],
};
