import { IconButton } from "../../components/iconButton";
import { IconButtonToggle } from "../../components/iconButtonToggle";
import { TaskItemText } from "./taskItemText";




export function TaskItem( { label, isEnabled, taskId, updateTaskState, removeTask, updateTaskTitle, editId, setEditId }:
    {label: string,
        isEnabled: boolean,
        taskId: number,
        updateTaskState: (taskId: number) => void,
        removeTask: (taskId: number) => void,
        updateTaskTitle: (taskId: number, taskTitle: string) => void,
        editId: number | null,
        setEditId: (value: number | null) => void}) {

    return (

        <div className="task-item">

            <IconButtonToggle
                iconButtonToggleData={{
                    iconImg: "https://raw.githubusercontent.com/redeswork/REDes-Assets/refs/heads/main/icons/tick_light%20(%23f3f3f3).png",
                    isEnabled: isEnabled,
                    handleClick: () => updateTaskState(taskId)
            }}/>

            <div className="content">

                <TaskItemText text={label} id={taskId} updateTaskTitle={updateTaskTitle} editId={editId} setEditId={setEditId}/>

            </div>

            <div className="content auto-w">

                <IconButton
                iconButtonData={{
                    variant: "solid",
                    iconImg: "https://raw.githubusercontent.com/redeswork/REDes-Assets/refs/heads/main/icons/delete_light%20(%23f3f3f3).png",
                    handleClick: () => removeTask(taskId)
                }}/>

            </div>
        </div>
    )
}