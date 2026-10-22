import type { User } from "@supabase/supabase-js";
import { supabase } from "../../../lib/supabase";

import { useState, useEffect } from "react";

import type { taskDataType } from '../taskData'

export function useTask(
    
    user: User | null,
    tableName: string
) {

    // Establish tasks using useState - set it to an array "[]" - of type "taskDataType[]" - make that array empty "([])"
    const [tasks, setTasks] = useState<taskDataType[]>([]);

    // Establish a message state that defaults to ""
    const [errorMessage, setErrorMessage] = useState("");

    // Establish a loading state boolean that defaults to true
    const [isLoading, setIsLoading] = useState(true);


    // useEffect used like this, with "}, [])" at the bottom, only fires on the very first render
    // This one fetches the table from Supabase
    useEffect(() => {

        // Check for presence of user
        if (!user) {
            // If no user
            // clear all tasks from previous session
            setTasks([])
            // no longer loading
            setIsLoading(false)
            return
        }

        // "async" is important so that waiting for this doesn't prevent the rest of the code from running
        async function fetchTasks() {

            // Attempt to load the table - "try"
            try {

                const { data, error } = await supabase

                    // Use FROM to select "Task Table"
                    .from(tableName)
                    // Use SELECT to select all rows "*"
                    .select('*')

                // If there is an error - print the error to console, set our error message - return so try{} fails
                if (error) {
                    console.error('Error fetching tasks:', error)
                    setErrorMessage("Couldn't load tasks. Please try again.")
                    return
                }

                // If there is no error - setTasks using "data"
                setTasks(data)
            } finally {

                // Once we've finished fetching, set isLoading to false
                setIsLoading(false)
            }
        }

        // Call the function defined above to start fetching the tasks
        fetchTasks()

    // Call this whenever user state changes
    }, [user, tableName])



    // Define an asynchronous function to create a new task - the input field passes the task name into this function
    async function createNewTask(newTaskName: string) {
        
        // Await 'supabase' client loading
        const { data, error} = await supabase

            // Choose 'Task Table' table
            .from(tableName)
            // Insert a row based on the input, set complete to false, no id setting necessary
            .insert({
                title: newTaskName,
                complete: false
            })

            // Select the newly inserted row so Supabase returns it in "data"
            .select()
            // Select only one row, returning it as an object rather than an array
            .single()

        // If Supabase reports an error, print the error details and exit the function
        if (error) {
            console.error('Error creating task:', error.message, error.code, error.details)
            return
        }

        // Update the tasks array using the current state supplied by React
        // Spread the existing tasks into a new array, then add the new task ("data") to the end
        setTasks(currentTasks => [...currentTasks, data])

    }


    async function updateTaskTitle(taskId: number, newTitle: string) {

        const task = tasks.find(task => task.id === taskId)

        if (!task) {
            return
        }

        const { data, error } = await supabase
            .from(tableName)

            .update({ title: newTitle})

            .eq('id', taskId)

            .select()

            .single()

        // If there is an error - print the error to console, set our error message - return so try{} fails
        if (error) {
            console.error('Error fetching tasks:', error)
            setErrorMessage("Couldn't load tasks. Please try again.")
            return
        }

        // Update the tasks array using the current state supplied by React
        setTasks(currentTasks =>

            // Use .map() to create a new array by checking each task in the current array
            currentTasks.map(currentTask =>

                // If this is the task we updated, replace it with the updated row from Supabase
                // Otherwise, keep the existing task unchanged
                currentTask.id === taskId ? data : currentTask
            )
        )

    }

    // Define an asynchronous function to update a task's completed status, using its id to identify the task
    async function updateTaskState(taskId: number) {

        // Search the current tasks array for the task with a matching id
        // .find() returns the first matching task, or undefined if there is no match
        const task = tasks.find(task => task.id === taskId)

        // If no matching task was found, exit the function because there is nothing to update
        if (!task) {
            return
        }

        // Send an update request to Supabase and extract the returned row ("data") and any error
        const { data, error } = await supabase
            .from(tableName)

            // Update the "complete" column to the opposite of the task's current value
            .update({ complete: !task.complete })

            // Only apply the update to the row whose id matches taskId
            .eq('id', taskId)

            // Return the updated row from Supabase
            .select()

            // Expect exactly one returned row, as a single object
            .single()

        // If Supabase reports an error, print it to the console and exit the function
        if (error) {
            console.error('Error updating task:', error)
            return
        }

        // Update the tasks array using the current state supplied by React
        setTasks(currentTasks =>

            // Use .map() to create a new array by checking each task in the current array
            currentTasks.map(currentTask =>

                // If this is the task we updated, replace it with the updated row from Supabase
                // Otherwise, keep the existing task unchanged
                currentTask.id === taskId ? data : currentTask
            )
        )
    }

    // Define an asynchronous function to remove a task, using its id to identify the task
    async function removeTask(taskId: number) {

        // Send a delete request to Supabase and extract any reported error
        const { error } = await supabase
            .from(tableName)

            // Request that the matching row be deleted
            .delete()

            // Match the row whose id equals taskId
            .eq('id', taskId)

        // If Supabase reports an error, print it to the console and exit the function
        if (error) {
            console.error('Error deleting task:', error)
            return
        }

        // Update the tasks array using the current state supplied by React
        setTasks(currentTasks =>

            // Use .filter() to create a new array containing every task except the one we deleted
            currentTasks.filter(task => task.id !== taskId)
        )
    }


    return {
        isLoading,
        tasks,
        errorMessage,
        createNewTask,
        updateTaskTitle,
        updateTaskState,
        removeTask
    }
}