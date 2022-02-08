import { useState } from "react";
const toUnix = (d) => Math.floor(d.getTime() / 1000);
const toDateInput = d => d.toISOString().substring(0, 10);
const AddTask = ({onAddTask}) => {
    const [title, setTitle] = useState('');
    const [interval, setInterval] = useState(30);
    const [cleaned, setCleaned] = useState(toDateInput(new Date()));
    
    const onSubmit = (e) => {
        e.preventDefault();

        const date = cleaned.split('-').map(Number)

        onAddTask({
            title,
            interval: interval*86400,
            cleaned: toUnix(new Date(date[0], date[1]-1, date[2]))
        })

        setTitle('');
        setInterval(30);
        setCleaned(toDateInput(new Date()));
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type='text'
                    placeholder='Clean Me' 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Interval (days)</label>
                <input type='number'
                    min={1}
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Last Cleaned</label>
                <input type='date'
                    value={cleaned}
                    onChange={(e) => setCleaned(e.target.value)}
                />
            </div>
          
            <input type='submit' value='Save' className="btn btn-block"/>
        </form>
    )};

export default AddTask;
