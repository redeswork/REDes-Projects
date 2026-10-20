import { IconButton } from "./iconButton";
import { TestList } from "./testList";
import { useState } from "react";




function SearchBox({search, updateSearch}: {search: string, updateSearch: (value: string) => void}) {
    

    return (
        <div>
                <input
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                style={{
                    borderBottomWidth: "1px",
                    borderColor: "black",
                    padding: "0 0 1rem 0",
                    fontSize: "1rem"
                }}></input>
                <p>{search}</p>
        </div>
    )
}


export function CounterDiv() {

    
    
    const min = 0;
    const [max, setMax] = useState(4)
    const [count, setCount] = useState(max);

    function increaseCount() {
        setCount(current => Math.min(current + 1, max));
    }

    function decreaseCount() {
        setCount(current => Math.max(current - 1, min));
    }

    const [search, updateSearch] = useState("");




    function CounterBox() {

        return (

            <div
            style={{
                    aspectRatio: 1/1,
                    height: "auto",
                    borderWidth: "1px",
                    borderColor: "#1f1f1f",
                    padding: "0.5rem"
            }}>
                <text
                style={{
                    fontSize: "1.5rem",
                }}>{count}</text>
            </div>
            )
    }

    


    return (

        <div>
            <div className="content">
                <SearchBox search={search} updateSearch={updateSearch} />
            </div>
            <div className="content">
                <IconButton
                iconButtonData={{
                    variant: "outline",
                    direction: "left",
                    handleClick: decreaseCount
                }}/>
                <CounterBox />
                <IconButton
                iconButtonData={{
                    variant: "outline",
                    direction: "right",
                    handleClick: increaseCount
                }}/>
            </div>
            <div>
                <TestList count={count - 1} onLengthChange={setMax} query={search}/>
            </div>
        </div>
    )
}