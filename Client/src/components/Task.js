import * as React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from "@mui/material/LinearProgress";
import { BiTrash } from "react-icons/bi";
import { green, yellow, orange, red } from '@mui/material/colors';
import { useState } from "react";
import { IoSparkles } from 'react-icons/io5'

const toUnix = (d) => Math.floor(d.getTime() / 1000);

const Task = ({ task, onDelete, onClean }) => {
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState('success');
    const [openCleanDialog, setOpenCleanDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    
    const onCleanClick = () => {
        setOpenCleanDialog(true);
    }
    
    const onCleanClose = (action) => {
        setOpenCleanDialog(false);
        action && onClean(task.id);
    }
    
    const onDeleteClick = () => {
        setOpenDeleteDialog(true);
    }
    
    const onDeleteClose = (action) => {
        setOpenDeleteDialog(false);
        action && onDelete(task.id);
    }
    
    React.useEffect(() => {
        const currentTime = toUnix(new Date());
        const percent = Math.min(100, Math.floor((currentTime - task.cleaned) / task.interval * 100));
        setProgress(percent)

        if (percent < 50)
            setColor(green[500])
        else if (percent < 75)
            setColor(yellow[500])
        else if (percent < 95)
            setColor(orange[500])
        else
            setColor(red[500])
            
    }, [task.cleaned, task.interval])
    return (
    <div className='task'
        style={{borderColor: color}}
    >
        <Dialog
            open={openCleanDialog}
            onClose={() => onCleanClose(false)}
            aria-labelledby="alert-clean-dialog-title"
        >
            <DialogTitle id="alert-clean-dialog-title">
                {`Did you clean ${task.title}?`}
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => onCleanClose(false)}>
                    No
                </Button>
                <Button onClick={() => onCleanClose(true)} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            open={openDeleteDialog}
            onClose={() => onDeleteClose(false)}
            aria-labelledby="alert-delete-dialog-title"
        >
            <DialogTitle id="alert-delete-dialog-title">
                {`Confirm delete ${task.title}?`}
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => onDeleteClose(false)}>
                    No
                </Button>
                <Button onClick={() => onDeleteClose(true)} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
        <h3>
            {task.title}
            <div>
                <IoSparkles
                    style={{color: green[500], cursor: 'pointer'}}
                    onClick={onCleanClick}
                />
                <div style={{display: 'inline', padding: '0 .5em'}}> <span/> </div>
                <BiTrash
                    onClick={onDeleteClick}
                    style={{color: '#d51616', cursor: 'pointer'}}
                />
            </div>
        </h3>     
        <LinearProgress
            variant="determinate"
            value={progress}
        />
    </div>);
};

export default Task;
