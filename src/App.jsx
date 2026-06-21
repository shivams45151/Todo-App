import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'

import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);




  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)

    }

  }, [])

  const saveToLS = (params) => {  //save to local storage
    localStorage.setItem("todos", JSON.stringify(todos))

  }
  const toggleFinished=(params) => {

    
  }
  



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)

  }
  const handleChange = (e) => {
    setTodo(e.target.value);

  }
  const handleCheckbox = (e) => {
    console.log(e, e.target);
    let id = e.target.name;
    console.log(`The id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    console.log(newTodos, todos)
    saveToLS()


  }

   
   


  return (
    <>
      <Navbar />

        

      {/* <button className='change mode bg-red-700 text-sm font-bold rounded-xl  py-2' onClick={changeMode}>Switch Mode</button> */}

      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">

        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input
            type="text"
            value={todo}
            onChange={handleChange}
            className='w-1/2 border'
          />
          <button onClick={handleAdd} className='bg-violet-700 text-sm font-bold hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6'>Save</button>

        </div>



        <h2 className='font-bold text-xl'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No todos to display</div>}
          {todos.map(item => {


            return <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-700 text-sm font-bold hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-700 text-sm font-bold hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1'>Delete</button>
              </div>

            </div>
          })}
        </div>

      </div>







    </>

  );
}


export default App
