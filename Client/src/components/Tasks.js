import Task from "./Task";
import { useState, useEffect } from "react";

const toUnix = (d) => Math.floor(d.getTime() / 1000);
/**
 * Calculate the percentage until a task must be done
 * @param {Task} t task
 * @param {Number} c Current time as unix timestamp
 * @returns percentage until task repeat
 */
const p = (t, c) => Math.floor((c - t.cleaned) / t.interval * 100);

const Tasks = ({ tasks, onDelete, onClean }) => {

    const [c, setC] = useState(toUnix(new Date()));
    useEffect(() => {
        setC(toUnix(new Date()));
    }, [tasks]);

    return (<>
        {tasks.sort((a, b) => 1 - p(a, c) + p(b, c)).map((task) => (
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
