import { IconButton } from "../../components/iconButton";
import { IconButtonToggle } from "../../components/iconButtonToggle";




export function TaskItem( { label, isEnabled, taskId, updateTaskState, removeTask }: {label: string, isEnabled: boolean, taskId: number, updateTaskState: (taskId: number) => void, removeTask: (taskId: number) => void }) {

    return (

        <div className="task-item">

            <p>{label}</p>

            <div className="content auto-w">

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
        </div>
    )
}