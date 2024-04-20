import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [todoText, setTodoText] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateTodoText, setupdateTodoText] = useState('');

  //add new todo item
  const addTodo = async (e) => {
    e.preventDefault();
    try{
      const todoItem = await axios.post('http://localhost:5500/api/item', {item: todoText});
      console.log(todoItem);
      setTodoList(prev => [...prev, todoItem.data]);
      setTodoText('');
    }
    catch(err){
      console.log(err);
    }
  }

  //get all todos
  useEffect(() => {
    const getTodoList = async () => {
      try{
        const todoItemList = await axios.get('http://localhost:5500/api/items');
        setTodoList(todoItemList.data);  
      }
      catch(err){
        console.log(err);
      }
    }
    getTodoList();
  }, []);

  //update a todo
  const updateTodo = async (e) => {
    e.preventDefault();
    try{
      const updatedTodo = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, {item: updateTodoText})
      console.log(updatedTodo.data);
      const index = todoList.findIndex(item => item._id === isUpdating)
      todoList[index].item = updateTodoText;
      setupdateTodoText('');
      setIsUpdating('')
    }
    catch(err){
      console.log(err);
    }
  }

  //render edit form
  const showUpdateForm = () => (
    <form className='update-form' onSubmit={(e) => {updateTodo(e)}}>
          <input className='update-input' type='text' placeholder='Edit todo' onChange={e => {setupdateTodoText(e.target.value)}} value={updateTodoText}></input>
          <button className='update-todo' type='submit'>Update</button>
    </form>
  )

  //delete a todo
  const deleteTodo = async (id) => {
    try{
      const deletedTodo = await axios.delete(`http://localhost:5500/api/item/${id}`);
      console.log(deletedTodo.data);
      const newList = todoList.filter(item => item._id !== id)
      setTodoList(newList);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='app'>
      <h1>Todo App</h1>
      <form onSubmit={e => addTodo(e)}>
        <input type='text' placeholder='Add todo item' onChange={e => {setTodoText(e.target.value)}} value={todoText}></input>
        <button type='submit'>Add</button>
      </form>
      <div className='todo-list'>
        {
          todoList.map(item => (
            <div className='todo-item'>
              {
                isUpdating === item._id ? showUpdateForm() : 
                <>
                  <p className='todo-content'>{item.item}</p>
                  <div className='item-controllers'>
                    <button className='update-button' onClick={() => {setIsUpdating(item._id)}}>Update</button>
                    <button className='delete-button' onClick={() => {deleteTodo(item._id)}}>Delete</button>
                  </div>
                </> 
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
