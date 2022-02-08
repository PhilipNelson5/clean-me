import { BiPlus } from "react-icons/bi"
import { useState } from 'react'

function AddButton({onToggleTaskForm}) {
    const [open, setOpen] = useState(false);
    const onClick = () => {
        setOpen(!open)
        onToggleTaskForm()
    }

    return <button onClick={onClick} className='btn'>
        <BiPlus className={`btn-icon ${open && 'rotate-45'}`}/>
    </button>
}

export default AddButton;
