import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import TodoNotFound from './TodoNotFound';

const Todo = ({ todos, onDelete }) => {
  const { id } = useParams();
  const todo = todos.find((e) => e.id === Number(id));

  if (!todo) return <TodoNotFound />;

  return (
    <div className="eventContainer">
      <h2>
        {todo.title}
        {' - '}
        {todo.complete}
        <Link to={`/todos/${todo.id}/edit`}>Edit</Link>
        <button
          className="delete"
          type="button"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </h2>
      <ul>
        <li>
          <strong>Title:</strong> {todo.title}
        </li>
        <li>
          <strong>Complete:</strong> {todo.complete}
        </li>
      </ul>
    </div>
  );
};

Event.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      complete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Todo;
