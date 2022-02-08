import Task from "./Task";

const Tasks = ({tasks, onDelete, onClean}) => {

    return (<>
        {tasks.map((task) => (
            <Task
                key={task.id}
                task={task}
                onDelete={onDelete}
                onClean={onClean}
            />
        ))}
    </>);
};

export default Tasks;
