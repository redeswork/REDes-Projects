import '../style.css'

import { useState } from 'react'

// import heroImg from './assets/hero.png'
// import typescriptLogo from './assets/typescript.svg'
// import viteLogo from './assets/vite.svg'
// import { setupCounter } from './counter.ts'



const buttonData = {
    text: "Counter Button",
    textColour: "#f3f3f3",
    backgroundColour: "#1c1c1c",
}


const products = [

    { title: "milk", isDairy: true, id: 1 },
    { title: "bread", isDairy: false, id: 2 },
    { title: "butter", isDairy: true, id: 3 }

]


const listItems = products.map(product =>

    <li
    key={product.id}
    style={{
        color: product.isDairy ? "#7531f7" : "#1f1f1f"
    }}>

        <p>{product.title}</p>
    </li>
)


function ShoppingList() {

    return (

        <ul className='shopping-list-item'>
            {listItems}
        </ul>

    )
}




function MyButton() {


    const [count, setCount] = useState(0);


    function handleClick() {

        setCount(count + 1)

    }


    return (
        <button
        style={{
            backgroundColor: buttonData.backgroundColour,
            color: buttonData.textColour
        }}

        onClick={handleClick}>

            {buttonData.text} {count}
        
        </button>
    )
}


export default function App() {
    return(

        <section className="section">
            
            <div className='wrapper'>
                
                <div className='content'>

                    <MyButton />
            
                </div>


                <div className='content'>

                    <MyButton />
            
                </div>


                <div className='content'>

                    <ShoppingList />
            
                </div>

            </div>
        
        </section>
        
    )
}