import { TaskItem } from "./TaskItem"
import { type taskDataType } from "./taskData"
import { useState } from "react"


export function TaskList({tasks, currentSort, updateTaskState, removeTask, updateTaskTitle}:
    {tasks: taskDataType[], currentSort: string, updateTaskState: (taskId: number) => void, removeTask: (taskId: number) => void, updateTaskTitle: (taskId: number, newTitle: string) => void }) {

    const [editId, setEditId] = useState<number | null>(null)

    
    const filteredTasks = tasks.filter((item) => {

        if (currentSort === "All") {

            // If currentSort is "All", allow all "item" to pass the filter
            return true
        
        }

        if (currentSort === "Completed") {

            // If currentSort is "Completed", allow all "item" with property "complete = true" to pass the filter
            return item.complete === true

        }

        if (currentSort === "Uncompleted") {

            // If currentSort is "Uncompleted", *prevent* all "item" with property "complete = true" to fail to pass the filter
            return item.complete === false

        }
    })
    

    filteredTasks.sort((a, b) => a.id - b.id)

    console.log(filteredTasks)

    const taskList = filteredTasks.map((item) => {

        return (

            <li
            key={item.id}>

                <TaskItem
                label={item.title}
                isEnabled={item.complete}
                taskId={item.id}
                updateTaskState={updateTaskState}
                removeTask={removeTask}
                updateTaskTitle={updateTaskTitle}
                // canEditId={canEditId}
                editId={editId}
                setEditId={setEditId}/>

            </li>
        )
    })

    return (
        <ul className="task-list shadow">

            {taskList}

        </ul>
    )
}