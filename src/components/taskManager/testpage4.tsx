import { InputField } from './inputField'
import { useState, useEffect } from 'react'
import '../../style.css'
import { RadioButton } from '../radioButton'
import { TaskList } from './taskList'
import { taskData, type taskDataType } from './taskData'



export default function App() {


    const [sortValue, updateSortValue] = useState("All");

    const [tasks, setTasks] = useState<taskDataType[]>(() => {
        
        const savedTasks = localStorage.getItem("tasks")

        if (savedTasks) {
            return JSON.parse(savedTasks)
        }

        return taskData

    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    function createNewTask(newTaskName: string) {
        
        // // Assign ID
        // // Set title to newTask
        // // Set default state to uncomplete

        // const actualNewTask = {
        //     id: (tasks.length + 1),
        //     title: newTaskName,
        //     complete: false
        // }

        // // Append actualNewTask to tasks
        // setTasks([...tasks, actualNewTask])

        setTasks(currentTasks => {

            const nextId = Math.max(0, ...currentTasks.map(task => task.id)) + 1;

            return [

                ...currentTasks,
                {
                    id: nextId,
                    title: newTaskName,
                    complete: false
                }
            ]


        })
    }

    function updateTaskState(taskId: number) {

        setTasks(tasks.map((task) => {
            if (task.id === taskId) {
                return {
                    ...task,
                    complete: !task.complete
                }
            }

            return task
        }))
    }

    function removeTask(taskId: number) {

        setTasks(tasks.filter((task) => task.id !== taskId))
    }

    return (
        
        <section className="section">

            <div className="wrapper">

                <div className='content vertical'>

                    <h1>Task Manager</h1>

                    <div className='content'>

                        <InputField onSubmit={createNewTask}/>
                    
                    </div>

                    <div className='content'>

                        <RadioButton label="All" radioGroup='status' currentVal={sortValue} onChange={updateSortValue}/>
                        <RadioButton label="Completed" radioGroup='status' currentVal={sortValue} onChange={updateSortValue}/>
                        <RadioButton label="Uncompleted" radioGroup='status' currentVal={sortValue} onChange={updateSortValue}/>

                    </div>

                    <div className='content full-w'>
                        <TaskList tasks={tasks} currentSort={sortValue} updateTaskState={updateTaskState} removeTask={removeTask}/>
                    </div>
                    
                </div>

            </div>
        </section>
    )
}