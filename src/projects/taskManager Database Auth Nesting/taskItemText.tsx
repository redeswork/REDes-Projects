import { useState, useRef, useEffect } from "react"


export function TaskItemText(
    {field, text, id, updateTaskTitle, editId, setEditId }:
    {field: {name: string, type: string}, text: string, id: number, updateTaskTitle: (taskId: number, newTaskTitle: string) => void, editId: string | null, setEditId: (value: string | null) => void}) {

    const [newTitle, updateNewTitle] = useState(text)

    const editKey = `${id}-${field.name}`

    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {

        if (editId === editKey) {
            inputRef.current?.focus()
        }
    }, [editId, editKey])


    function toggleEditable() {
        setEditId(editKey)
        console.log("Clicked task:", editKey);
        setEditId(editKey)

    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setEditId(null)
        updateTaskTitle(id, newTitle)

    }

    return (

        <div className="content left-aligned">

            {(editId !== editKey) ? (

                <button className="left-aligned unstyled no-bg" style={{color: "#1f1f1f"}} onClick={toggleEditable}>

                    <p style={{fontSize: "var(--text-H5)", textAlign: "left"}}>
                        {text}
                    </p>

                </button>

            ) : (
                <form onSubmit={handleSubmit}>
                    <textarea
                    ref={inputRef}
                    style={{fontSize: "var(--text-H5"}}
                    onChange={(event) => updateNewTitle(event.target.value)}
                    onKeyDown={(event) => { 
                        if (event.key === "Escape") {
                        updateNewTitle(text)
                        setEditId(null)
                        }
                        if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault()
                            event.currentTarget.form?.requestSubmit()
                        }
                    }}
                    onBlur={() => {
                        updateNewTitle(text)
                        setEditId(null)
                    }}
                    value={newTitle}>
                    
                    </textarea>
                </form>
            )}
            

        </div>
    )
}