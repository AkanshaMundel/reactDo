import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-https';

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  

  
    // const transformTasks = taskObj =>{
    //   const loadedTasks =[];
 
    //   for(const taskKey in taskObj){
    //    loadedTasks.push({id: taskKey, text: taskObj[taskKey].text});//converting obj into ui format 
    //   }
    //   setTasks(loadedTasks);
    // };
 
  
    



 const {isLoading , error, sendRequest: fetchTasks}  =  useHttp();
  
 
  // const fetchTasks = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       'https://filmspot-86bf8-default-rtdb.firebaseio.com/tasks.json'
  //     );

  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     const data = await response.json();

  //     const loadedTasks = [];

  //     for (const taskKey in data) {
  //       loadedTasks.push({ id: taskKey, text: data[taskKey].text });
  //     }

  //     setTasks(loadedTasks);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };

  useEffect(() => {
    const transformTasks = taskObj =>{
      const loadedTasks =[];
 
      for(const taskKey in taskObj){
       loadedTasks.push({id: taskKey, text: taskObj[taskKey].text});//converting obj into ui format 
      }
      setTasks(loadedTasks);
    };

    fetchTasks(
      {url:'https://filmspot-86bf8-default-rtdb.firebaseio.com/tasks.json'}
      , transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;

//in app will get the data thrugh fetch 
//in task -> will post the data 
//in both newtask nd app we managing ng loading state 
//especially in custom hook a function type uses a hooks nd state but not use in nrml fun 