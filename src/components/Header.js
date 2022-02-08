import AddButton from "./AddButton";
import RefreshButton from "./RefreshButton";

const Header = ({onReloadTasks, onToggleTaskForm}) => {
    return (
        <header>
            <RefreshButton onReloadTasks={onReloadTasks}/>
            <h1>Clean Me</h1>
            <AddButton onToggleTaskForm={onToggleTaskForm}/>
        </header>
    );
};

export default Header;
