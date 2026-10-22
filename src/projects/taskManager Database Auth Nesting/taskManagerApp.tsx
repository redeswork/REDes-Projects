
import { InputField } from './inputField'
import { useState, useEffect } from 'react'
import '../../style.css'
import { RadioButton } from '../../components/radioButton'
import { TaskList } from './taskList'
import { supabase } from '../../lib/supabase'
import { SignUpForm } from './signUpForm'
import { SignInForm } from './signInForm'
import type { User } from '@supabase/supabase-js'

import { useTask } from './logic/useTask'

import { useNavigate } from 'react-router'


export default function App() {

    
    // Establish useState values
    // 
    // Establish a sortValue, preset it to "All" - this matches with the toggle to set the default to enabled
    const [sortValue, updateSortValue] = useState("All");

    const navigate = useNavigate()

    // Establish user state
    const [user, setUser] = useState<User | null>(null)

    // Establish sign in v sign up
    const [showSignIn, setShowSignIn] = useState(true)

    const tableName = 'Task Table_test'

    const  {
        isLoading,
        tasks,
        errorMessage,
        createNewTask,
        updateTaskTitle,
        updateTaskState,
        removeTask
    } = useTask(user, tableName)




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








    


    return (
        
        <section className="section">

            <div className="wrapper">

                <div>

                    <button onClick={() => navigate("/")}>Back</button>

                </div>


                {/* SIGNING IN / UP */}
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
