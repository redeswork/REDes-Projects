import { useState } from "react"
import { IconButton } from "../iconButton"

export function InputField({onSubmit}: {onSubmit: (newTaskName: string) => void}) {

    const [newTask, setNewTask] = useState("")

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        // This bit needs to pass the string up to the page & back down to the taskList

        onSubmit(newTask)
        // doAddToArray(actualNewTask)

        setNewTask("")
    }

    return (

        <div>
            <form className="content" onSubmit={handleSubmit}>

                <input className="input-field"
                name="input"
                type="text"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}></input>

                <button className="unstyled" type="submit">

                    <IconButton
                        iconButtonData={{
                            variant: "solid",
                            iconImg: "https://raw.githubusercontent.com/redeswork/REDes-Assets/refs/heads/main/icons/add_light%20(%23f3f3f3).png"
                    }}/>

                </button>
                
            </form>

        </div>
    )

}