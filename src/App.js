import './App.css';
import Header from './components/Header'
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';
import { useState } from "react";


const toUnix = (d) => Math.floor(d.getTime() / 1000);
function App() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "bedroom",
            cleaned: toUnix(new Date(2022, 0, 1)),
            interval: 30*86400
        },
        {
            id: 2,
            title: "kitchen",
            cleaned: toUnix(new Date(2022, 0, 15)),
            interval: 30*86400
        },
        {
            id: 3,
            title: "bathroom",
            cleaned: toUnix(new Date(2022, 0, 30)),
            interval: 30*86400
        }
    ])
    
    const reloadTasks = () => {
        console.log('refresh');
    }
    
    const toggleTaskForm = () => {
        setShowAddForm(!showAddForm);
    }
    
    const addTask = (props) => {
        console.log('add', props);
    }

    const cleanTask = (id) => {
        console.log('clean', id);
    }

    const deleteTask = (id) => {
        console.log('delete', id);
    }

    return (
        <div className="App container">
            <Header
                onReloadTasks={reloadTasks}
                onToggleTaskForm={toggleTaskForm}
            />
            { showAddForm && <AddTask onAddTask={addTask} /> }
            <Tasks
                tasks={tasks}
                onClean={cleanTask}
                onDelete={deleteTask}
            />
        </div>
    );
}

export default App;
