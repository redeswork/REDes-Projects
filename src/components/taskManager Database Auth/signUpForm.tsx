import { useState } from "react"


export function SignUpForm({runSignUp}: {runSignUp: (email: string, password: string) => Promise<void>}) {

    const [ newEmail, setEmail ] = useState("");

    const [ newPass, setPass ] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault()

        runSignUp(newEmail, newPass)

    }


    return (

        <div className="content-card" style={{width: "100%", paddingTop:"2rem"}}>

            <div className="content vertical">
                <h2 style={{fontWeight: "var(--text-H3)"}}>Sign-Up</h2>
                <form onSubmit={handleSubmit} style={{width: "100%"}}>

                    <input
                    name="signup-email"
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={newEmail}
                    ></input>

                    <input
                    name="signup-password"
                    type="password"
                    onChange={(event) => setPass(event.target.value)}
                    value={newPass}
                    ></input>

                    <button className="hover" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}