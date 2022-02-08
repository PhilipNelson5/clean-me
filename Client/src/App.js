import './App.css';
import AddTask from './components/AddTask';
import Header from './components/Header'
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
const toUnix = (d) => Math.floor(d.getTime() / 1000);

function App() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [tasks, setTasks] = useState([])
    
    const getTasks = async () => {
        return fetch('/api/tasks')
        .then(res => res.json())
        .then(data => data.tasks)
    }
    
    useEffect(() => {
        getTasks()
        .then(tasks => setTasks(tasks))
    }, []);
    
    const reloadTasks = () => {
        getTasks()
        .then(tasks => setTasks(tasks))
    }
    
    const toggleTaskForm = () => {
        setShowAddForm(!showAddForm);
    }
    
    const addTask = (task) => {
        console.debug('add', task);
        fetch('/api/task', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                task.id = data.id;
                setTasks([...tasks, task]);
            } else {
                console.error(data);
            }
        })
    }

    const cleanTask = (id) => {
        console.debug('clean', id);
        const now = toUnix(new Date());

        fetch('/api/clean', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                const i = tasks.findIndex((task) => task.id === id);
                setTasks([
                    ...tasks.slice(0, i),
                    {...tasks[i], cleaned: now},
                    ...tasks.slice(i+1)
                ]);
            } else {
                console.error(data);
            }
        })
    }

    const deleteTask = (id) => {
        console.debug('delete', id);
        fetch('/api/task', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                setTasks(tasks.filter(t => t.id !== id));
            } else {
                console.error(data);
            }
        })
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
