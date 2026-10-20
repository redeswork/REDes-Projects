
import { InputField } from './inputField'
import { useState, useEffect } from 'react'
import '../../style.css'
import { RadioButton } from '../radioButton'
import { TaskList } from './taskList'
import type { taskDataType } from '../taskManager/taskData'
import { supabase } from '../../lib/supabase'
import { SignUpForm } from './signUpForm'
import { SignInForm } from './signInForm'
import type { User } from '@supabase/supabase-js'


export default function App() {

    // 
    // Establish useState values
    // 
    // Establish a sortValue, preset it to "All" - this matches with the toggle to set the default to enabled
    const [sortValue, updateSortValue] = useState("All");

    // Establish tasks using useState - set it to an array "[]" - of type "taskDataType[]" - make that array empty "([])"
    const [tasks, setTasks] = useState<taskDataType[]>([]);

    // Establish a loading state boolean that defaults to true
    const [isLoading, setIsLoading] = useState(true);

    // Establish a message state that defaults to ""
    const [errorMessage, setErrorMessage] = useState("");

    // Establish user state
    const [user, setUser] = useState<User | null>(null)

    // Establish sign in v sign up
    const [showSignIn, setShowSignIn] = useState(true)

    const tableName = 'Task Table_test'

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
    }, [user])

    useEffect(() => {
        const {data} = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user || null)
            }
        );

        return () => {
            data.subscription.unsubscribe()
        }
    }, [])

    // This checks for a Supabase session
    useEffect(() => {
        async function getSession() {
            const { data, error } = await supabase.auth.getSession()

            // If error, return
            if (error) {
                console.error("Error getting session:", error.message)
                return
            }

            // If user, assign the user to the session, if not user is null
            setUser(data.session?.user ?? null)
        }

        getSession()
    }, [])



    // Signup
    async function signUp(email: string, password: string) {

        // supabase.auth.signUp creates the account
        // email & password are passed as an object {x, y}
        const { data, error} = await supabase.auth.signUp({
            email,
            password
        })

        // If unsuccessful, error
        if (error) {
            console.error('Sign-up failed:', error.message)
            return
        }

        // If not, print results
        console.log("Sign-up results:", data)
    }

    // Sign In
    async function signIn(email: string, password: string) {

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            console.error('Sign-in failed:', error.message)
            return
        }

        console.log('Sign-in successful:', data)
    }

    // async function checkSession() {
    //     const { data, error } = await supabase.auth.getSession()

    //     console.log("Session:", data.session)
    //     console.log("Session check error:", error)
    // }




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

    return (
        
        <section className="section">

            <div className="wrapper">

                {user ? (
                    <div className='content'>
                        <button className="hover" onClick={async () => {
                            const { error } = await supabase.auth.signOut()

                            if (error) {
                                console.error('Sign-out failed:', error.message)
                            }
                        }}>
                            Sign Out
                        </button>
                    </div>

                ) : (
  
                    <div className='content vertical'>

                        {showSignIn ? (

                                <SignInForm runSignIn={signIn}/>
                            
                        ) : (    
                            
                                <SignUpForm runSignUp={signUp}/>

                        )}

                        <button className='hover' onClick={() => setShowSignIn(!showSignIn)}>
                            {showSignIn ? "Don't have an account?" : "Sign in here"}
                        </button>
                    </div>
                )}


                
                {user && (
                    // {/* ACTUAL TASK MANAGER */}
                    <div className='content vertical'>

                        <h1 className="page-heading" style={{fontWeight: 400}}><span style={{fontWeight: 700}}>RE Design </span>Task Manager</h1>

                        {/* <button onClick={checkSession}>Check Session</button> */}

                        <div className='content'>

                            {/* Render the InputField component and pass createNewTask to it as a prop
                                The child component can call this function when a task is submitted */}
                            <InputField onSubmit={createNewTask}/>
                        
                        </div>

                        <div className='content'>

                            {/* Render three RadioButton components
                                Each receives the current sort value and the function used to update it */}
                            <RadioButton label="All" radioGroup='status' currentVal={sortValue} onChange={updateSortValue}/>
                            <RadioButton label="Completed" radioGroup='status' currentVal={sortValue} onChange={updateSortValue}/>
                            <RadioButton label="Uncompleted" radioGroup='status' currentVal={sortValue} onChange={updateSortValue}/>

                        </div>

                        <div className='content full-w'>

                            {/* Conditional rendering: choose what to display based on the current state */}
                            {isLoading ? (

                                // If isLoading is true, display the loading message while the database request is in progress
                                <div>

                                    <p style={{fontSize: "2rem", lineHeight: "1.2em"}}>Task List Loading...</p>
                                
                                </div>
                            
                            ) : errorMessage ? (

                                // If loading has finished but errorMessage contains text, display that message
                                <p>{errorMessage}</p>
                            
                            ) : (
                                // If loading has finished and there is no error message, display the task list
                                // Pass the current tasks, sort value, and update/delete functions into TaskList as props
                                <TaskList tasks={tasks} currentSort={sortValue} updateTaskState={updateTaskState} removeTask={removeTask} updateTaskTitle={updateTaskTitle}/>
                            )}
                        </div>
                        
                    </div>
                )}



            </div>
        </section>
    )
}
