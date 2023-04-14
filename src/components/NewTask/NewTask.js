

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp  from '../../hooks/use-https';

const NewTask = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

 const createTask = (taskText, taskData)=>{
  const generateId = taskData.name;
  const createdTask = { id: generateId, text : taskText };

  props.onAddTask(createdTask);
 };
  // const enterTaskHandler = async (taskText) => {
    
  //   // setError(null);
  //   try {
  //     const response = await fetch(
  //       'https://react-http-6b4a6.firebaseio.com/tasks.json',
  //       {
  //         method: 'POST',
  //         body: JSON.stringify({ text: taskText }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     const data = await response.json();

  //     const generatedId = data.name; // firebase-specific => "name" contains generated id
  //     const createdTask = { id: generatedId, text: taskText };

  //     props.onAddTask(createdTask);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };
  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: 'https://filmspot-86bf8-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

//here no condition for infinite loop as this is render when button is or form is submitter