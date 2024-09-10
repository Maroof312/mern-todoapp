import axios from 'axios';
import {
  TODO_LIST_REQUEST,
  TODO_LIST_SUCCESS,
  TODO_LIST_FAIL,
  TODO_CREATE_REQUEST,
  TODO_CREATE_SUCCESS,
  TODO_CREATE_FAIL,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
  TODO_UPDATE_FAIL,
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_DELETE_FAIL,
} from '../constants/todoConstants';

export const listTodos = () => async (dispatch) => {
  try {
    dispatch({ type: TODO_LIST_REQUEST });
    const { data } = await axios.get('/api/todos');
    dispatch({ type: TODO_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TODO_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createTodo = (text) => async (dispatch) => {
  try {
    dispatch({ type: TODO_CREATE_REQUEST });
    const { data } = await axios.post('/api/todos', { text });
    dispatch({ type: TODO_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TODO_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateTodo = (id, todo) => async (dispatch) => {
  try {
    dispatch({ type: TODO_UPDATE_REQUEST });
    const { data } = await axios.put(`/api/todos/${id}`, todo);
    dispatch({ type: TODO_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TODO_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    dispatch({ type: TODO_DELETE_REQUEST });
    await axios.delete(`/api/todos/${id}`);
    dispatch({ type: TODO_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: TODO_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
