import React from "react";
import { useState, useEffect } from "react";
import Header from './Components/Header.js'
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);


  useEffect( () => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks();
        setTasks(tasksFromServer);
      }
      getTasks();
  }, []);


    //fetch Ttasks
    const  fetchTasks = async () => {
      const   res = await fetch('http://localhost:7000/tasks');
      const data = await res.json();
      
      return data;
    }

    const  fetchTask = async (id) => {
      const   res = await fetch(`http://localhost:7000/tasks/${id}`);
      const data = await res.json();
      
      return data;
    }

  //add task
    const addTask = async (task) => {
        const res = await fetch("http://localhost:7000/tasks", {

            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
          }
        )
        
    const data =  await res.json();

      setTasks([...tasks, data])

     

    }
  // delete task
    const deleteTask = async (id) => {
      await  fetch(`http://localhost:7000/tasks/${id}`,
        {
          method:"DELETE"
        }
        
      )

        setTasks(tasks.filter(
            (task) => task.id !== id
         ));
    }
  
    const toggleReminder = async (id) => {
      const taskToToggle = await fetchTask(id);
      const updatedTask = {...taskToToggle, reminder:!taskToToggle.reminder}

      const res =  await fetch(`http://localhost:7000/tasks/${id}`,{
          method: "PUT",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(updatedTask)
      }
      )

      const data= await res.json();
      setTasks(tasks.map(
        (task) =>  task.id === id ? { ...task, reminder:data.reminder} : task
      ))
    }

  return (
    <div className="container">
    
    <Header   title={'Task Tracker'}  
              onAdd={ () => setShowAddTask(!showAddTask)}
              textContent={showAddTask} 
    />
    
    {showAddTask && <AddTask  onAdd={addTask} />}
    <p className="footer">Double Click to active reminder</p>
    { tasks.length >0 ?<Tasks tasks={tasks} onDelete= {deleteTask} onToggle={toggleReminder}/>:
      "No task to show"
    }
    
    </div>
  );
}

export default App;
