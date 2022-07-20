import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const TodoList = ({ todos }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInput = useRef(null);

  const updateSearchTerm = () => {
    setSearchTerm(searchInput.current.value);
  };

  const matchSearchTerm = (obj) => {
    // eslint-disable-next-line camelcase
    const { id, complete, created_at, updated_at, ...rest } = obj;
    return Object.values(rest).some(
      (value) => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
  };

  const renderTodos = (todoArray) =>
    todoArray
      .filter((el) => matchSearchTerm(el))
      // .sort((a, b) => new Date(b.todo_date) - new Date(a.todo_date))
      .map((todo) => (
        <li key={todo.id}>
          <NavLink to={`/todos/${todo.id}`}>
            {todo.title}
          </NavLink>
        </li>
      ));

  return (
    <section className="todoList">
      <h2>
        Todos
        <Link to="/todos/new">New Todo</Link>
      </h2>

      <input
        className="search"
        placeholder="Search"
        type="text"
        ref={searchInput}
        onKeyUp={updateSearchTerm}
      />

      <ul>{renderTodos(todos)}</ul>
    </section>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TodoList;
