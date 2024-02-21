import {Header} from "./components/Header/Header.jsx";
import {Tasks} from "./components/Tasks/Tasks.jsx";
import {useEffect, useState} from "react";

const LOCAL_STORAGE_KEY = "todo:saved-tasks";

function App() {
    const [tasks, setTasks] = useState([]);

    function loadSavedTasks() {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if(saved) {
            setTasks(JSON.parse(saved))
        }
    }

    useEffect(() => {
        loadSavedTasks();
    }, []);

    function setTasksAndSave(newTasks) {
            setTasks(newTasks);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
    }

    function addTask(taskTitle) {
        if (taskTitle && taskTitle.trim()) {
            setTasksAndSave([
                ...tasks,
                {
                    id: crypto.randomUUID(),
                    title: taskTitle.trim(),
                    isCompleted: false
                }
            ])
        } else {
            alert("Task title cannot be empty.");
        }
    }



    function deleteTaskById(taskId) {
        const newTasks = tasks.filter(task => task.id !== taskId);
        setTasksAndSave(newTasks);
    }

    function toggleTaskCompletedById(taskId) {
        const newTasks = tasks.map(task => {
            if(task.id === taskId) {
                return {
                    ...task,
                    isCompleted: !task.isCompleted
                }
            }
            return task;
        })
        setTasksAndSave(newTasks);
    }

  return (
      <>
        <Header onAddTask={addTask}/>
        <Tasks
            tasks={tasks}
            onDelete={deleteTaskById}
            onComplete={toggleTaskCompletedById}
        />
      </>

  )
}
export default App
