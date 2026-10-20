import { useState } from "react"
import { IconButton } from "./iconButton"
import { CounterDiv } from "./counterDiv"
import { TestList } from "./testList"
export { IconButton, CounterDiv, TestList }

function CardImage() {

    return (
        <img src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
        style={{
            width: "100%",
            height: "100%"
        }}></img>
    )
}


export function Card() {

    const card = {

        bgColour: ""
    }
    return (

        <div className="card">
            <div className="card-content">
                <CardImage />
                <h2 className="card-heading">This is a card</h2>
            </div>

            <div className="card-bg"
            style={{
                backgroundColor: card.bgColour ? card.bgColour : "#f3f3f3"
            }}>

            </div>
        </div>
    )
}


type buttonData = {

    variant?: string,
    text?: string,
    textColour?: string,
    backgroundColour?: string

}

type buttonProps = {
    buttonData?: buttonData
}


export function Button({ buttonData = {} }: buttonProps) {


    const defaults = {
        variant: "primary",
        text: "Button",
        // textColour: "#f3f3f3",
        // backgroundColour: "#1c1c1c",
    }

    const data = {
        ...defaults,
        ...buttonData,
    }

    const variant = data.variant || "primary"

    let setClass

    if (data.variant === "primary") {

        setClass = ""

    } else if (data.variant === "secondary") {

        setClass = "secondary"

    } else if (data.variant === "underline") {

        setClass = "underline"

    }


    function handleClick() {


    }


    return (
        <button
        style={{
            backgroundColor: data.backgroundColour,
            color: data.textColour
        }}
        className = {setClass}

        onClick={handleClick}>

            {data.text}
        
        </button>
    )
}
