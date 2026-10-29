
import { useState, useRef, useEffect } from "react"

export function TaskItemOrder({
    field,
    order,
    id,
    updateTaskOrder,
    editId,
    setEditId
}: {
    field: { name: string, type: string}
    order: number
    id: number
    updateTaskOrder: (taskId: number, newTaskOrder: number) => void
    editId: string | null
    setEditId: (value: string | null) => void
}) {
    const [newOrder, updateNewOrder] = useState(String(order))

    const editKey = `${id}-${field.name}`

    const inputRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (editId === editKey) {
            inputRef.current?.focus()
        }
    }, [editId, editKey])

    useEffect(() => {
        updateNewOrder(String(order))
    }, [order])

    function toggleEditable() {
        setEditId(editKey)
        updateNewOrder(String(order))
        setEditId(editKey)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const parsedOrder = Number(newOrder)

        if (
            newOrder.trim() === "" ||
            !Number.isFinite(parsedOrder)
        ) {
            return
        }

        updateTaskOrder(id, parsedOrder)
        setEditId(null)
    }

    function handleCancel() {
        updateNewOrder(String(order))
        setEditId(null)
    }

    return (
        <div className="content left-aligned">
            {editId !== editKey ? (
                <button
                    type="button"
                    className="left-aligned unstyled no-bg"
                    style={{ color: "#1f1f1f" }}
                    onClick={toggleEditable}
                >
                    <p
                        style={{
                            fontSize: "var(--text-H5)",
                            textAlign: "left"
                        }}
                    >
                        {order}
                    </p>
                </button>
            ) : (
                <form onSubmit={handleSubmit}>
                    <textarea
                        ref={inputRef}
                        style={{ fontSize: "var(--text-H5)" }}
                        onChange={(event) => {
                            updateNewOrder(event.target.value)
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Escape") {
                                handleCancel()
                            }

                            if (
                                event.key === "Enter" &&
                                !event.shiftKey
                            ) {
                                event.preventDefault()
                                event.currentTarget.form?.requestSubmit()
                            }
                        }}
                        onBlur={() => {
                            updateNewOrder(String(order))
                            setEditId(null)
                        }}
                        value={newOrder}
                    />
                </form>
            )}
        </div>
    )
}
