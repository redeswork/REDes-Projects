import { TaskItem } from "./TaskItem"
import { type taskDataType } from "./taskData"
import { Fragment } from 'react'


export function TaskList({tasks, currentSort, updateTaskState, removeTask, updateTaskTitle, updateTaskOrder}:
    {tasks: taskDataType[], currentSort: string, updateTaskState: (taskId: number) => void, removeTask: (taskId: number) => void, updateTaskTitle: (taskId: number, newTitle: string) => void,updateTaskOrder: (taskId: number, newOrder: number) => void }) {


    
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
    

    filteredTasks.sort((a, b) => a.order - b.order)

    console.log(filteredTasks)

    const taskList = filteredTasks.map((item) => {

        return (

            <Fragment key={item.id}>

                <TaskItem
                label={item.title}
                order={item.order}
                isEnabled={item.complete}
                taskId={item.id}
                updateTaskState={updateTaskState}
                removeTask={removeTask}
                updateTaskTitle={updateTaskTitle}
                updateTaskOrder={updateTaskOrder}
                />

            </Fragment>
        )
    })

    return (
        <div className="task-list shadow">

            <div className="task-grid">
                <p className="task-content-desc" style={{gridColumn: "1/2", gridRow: "1/2"}}>ORDER</p>
                <p className="task-content-desc" style={{gridColumn: "2/5", gridRow: "1/2"}}>TASK</p>
                {taskList}
            </div>
            

        </div>
    )
}