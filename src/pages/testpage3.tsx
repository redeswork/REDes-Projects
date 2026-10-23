import '../style.css'

import { ProjectCardList } from "../components/projectCardList"
import { SearchField } from '../components/searchField'
import { ToggleButton } from '../components/toggleButton'
import { RadioButton } from '../components/radioButton'
import { useState } from 'react'

export default function App() {

    const [search, updateSearch] = useState("");

    const [currentCat, updateCurrentCat] = useState<string[]>([]);

    // useState here must declare the first sorting value
    const [sortValue, updateSortValue] = useState("A-Z");
    
    // Adds filter to currentCat array
    // 
    // This gets fired by "updateCurrentCat={toggleFilter}" argument on the ToggleButton
    function toggleFilter(filter: string) {
        if (currentCat.includes(filter)) {
            // Already selected: remove it
            updateCurrentCat(currentCat.filter(item => item !== filter));
        } else {
            // Not selected: add it
            updateCurrentCat([...currentCat, filter]);
        }
    }

    return (
        <section className="section">

            <div className="wrapper">

                <div className='content vertical'>

                    <h1>Search Test</h1>
                    <SearchField search={search} submittable={false} updateSearch={updateSearch} />
                    
                    <div className='content vertical'>

                        <div className='content'>
                            <ToggleButton label="Live" toggleFilter={toggleFilter}/>
                            <ToggleButton label="Website Development" toggleFilter={toggleFilter}/>
                            <ToggleButton label="Brand Development" toggleFilter={toggleFilter}/>
                            <ToggleButton label="Store Refit" toggleFilter={toggleFilter}/>

                        </div>

                        <div className='content'>
                            <RadioButton label="Name A-Z" radioGroup="sort" currentVal={sortValue} onChange={updateSortValue}/>
                            <RadioButton label="Name Z-A" radioGroup="sort" currentVal={sortValue} onChange={updateSortValue}/>
                            <RadioButton label="Category A-Z" radioGroup="sort" currentVal={sortValue} onChange={updateSortValue}/>
                            <RadioButton label="Category Z-A" radioGroup="sort" currentVal={sortValue} onChange={updateSortValue}/>
                        </div>

                        <div className="content full-w">

                            <ProjectCardList query={search} currentCat={currentCat} sortValue={sortValue}/>


                        </div>
                        
                    </div>
                
                </div>

                

            </div>
        </section>
    )
}