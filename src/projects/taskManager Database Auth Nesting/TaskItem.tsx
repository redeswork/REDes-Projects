import { IconButton } from "../../components/iconButton";
import { IconButtonToggle } from "../../components/iconButtonToggle";
import { TaskItemText } from "./taskItemText";
import { TaskItemOrder } from "./taskItemOrder";
import { useState } from "react";



export function TaskItem( { label, order, isEnabled, taskId, updateTaskState, removeTask, updateTaskTitle, updateTaskOrder }:
    {
        label: string,
        order: number,
        isEnabled: boolean,
        taskId: number,
        updateTaskState: (taskId: number) => void,
        removeTask: (taskId: number) => void,
        updateTaskTitle: (taskId: number, taskTitle: string) => void,
        updateTaskOrder: (taskId: number, taskOrder: number) => void
    
    }) {

    const fields = {
        taskTitle: { name: "title", type: "text" },
        taskOrder: { name: "order", type: "number"}
    }

    const [editId, setEditId] = useState<string | null>(null)



    return (

        <div className="task-item-wrap">

            <div className="task-item-header">
                <TaskItemOrder
                field={fields.taskOrder}
                order={order}
                id={taskId}
                updateTaskOrder={updateTaskOrder}
                editId={editId}
                setEditId={setEditId}/>

                <TaskItemText
                field={fields.taskTitle}
                text={label}
                id={taskId}
                updateTaskTitle={updateTaskTitle}
                editId={editId}
                setEditId={setEditId}/>

                <IconButtonToggle
                    
                    iconButtonToggleData={{
                        iconImg: "https://raw.githubusercontent.com/redeswork/REDes-Assets/refs/heads/main/icons/tick_light%20(%23f3f3f3).png",
                        isEnabled: isEnabled,
                        handleClick: () => updateTaskState(taskId)
                    }}/>

                <IconButton
                iconButtonData={{
                    variant: "solid",
                    iconImg: "https://raw.githubusercontent.com/redeswork/REDes-Assets/refs/heads/main/icons/delete_light%20(%23f3f3f3).png",
                    handleClick: () => removeTask(taskId)
                }}/>

            </div>

            <div className="divider"></div>

            <div className="content">






            </div>
        </div>
    )
}