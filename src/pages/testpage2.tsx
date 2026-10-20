import "./style.css"
// import { useState } from "react"
import type { ReactNode } from "react"
import {
    Card,
    Button,
    IconButton,
    CounterDiv,
    TestList
} from "../components/basicComponents"
import { ProjectCardList } from "../components/projectCardList"


function CardHolder({children}: {children: ReactNode}) {

    return (

        <div className="cards">
            {children}
        </div>
    )
}



export default function App() {

    return(

        <section className="section">
            
            <div className='wrapper'>

                <div className="content">

                    <Button 
                    buttonData={{
                        text: "PRIMARY"
                    }}/>
                    <Button 
                    buttonData={{
                        text: "SECONDARY",
                        variant: "secondary"
                    }}/>
                    <Button 
                    buttonData={{
                        text: "UNDERLINE",
                        variant: "underline"
                    }}/>


                </div>

                <div className="content">

                    <IconButton
                    iconButtonData={{
                        // iconImg: "",
                        variant: "outline",
                        direction: "left"
                    }}/>

                    <IconButton
                    iconButtonData={{
                        // iconImg: ""
                        variant: "outline",
                        direction: "right"
                    }}/>
                </div>

                <div className="content">
                    <CounterDiv />
                </div>

                {/* <div className="content">
                    <TestList />
                </div> */}
                




            </div>
        
        </section>
    )
}