import { useNavigate } from "react-router"
import { useState } from "react"

import { EventList } from "./eventList"
import { ToggleButton } from "../../components/toggleButton"

import { events } from "./sampleEvents"


export default function App() {

    const navigate = useNavigate()

    const [categories, setCategories] = useState<string[]>([])

    const allCategories = [...new Set(events.map((event) => event.category))]

    function setToggleVal(filter: string) {
        if (categories.includes(filter)) {
            setCategories(categories.filter(item => item !== filter))
        } else {
            setCategories([...categories, filter])
        }
    }

    console.log(categories)

    return(

        <section className="section">
            <div className="wrapper">
                <button onClick={() => navigate("/")}>Back</button>
                <h1 className="section-heading">Events App</h1>

                <div className="content-card">
                    <div className="content vertical left-aligned">
                        <h2>What's On:</h2>

                        <div className="content vertical left-aligned gap-half">
                            <p>Category:</p>
                            <div className="content left-aligned">

                                {allCategories.map((cat) => (
                                    <ToggleButton key={cat} label={cat} toggleFilter={setToggleVal}/>
                                ))}

                            </div>
                        </div>
                        
                        <EventList />
                    </div>
                </div>
            </div>
        </section>
    )
}