import { error } from './notifications';

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

// const isValidDate = (dateObj) => !Number.isNaN(Date.parse(dateObj));

export const validateTodo = (todo) => {
  const errors = {};

  if (todo.title === '') {
    errors.title = 'You must enter a title';
  }
  return errors;
};

export const formatDate = (d) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
};

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.error(err);
};
