import { BiRefresh } from "react-icons/bi"

function RefreshButton({ onReloadTasks }) {
    return (
        <button onClick={onReloadTasks} className='btn'>
            <BiRefresh className='btn-icon'/>
        </button>
    );
}

export default RefreshButton;
