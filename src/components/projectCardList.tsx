import { projectData } from "../data/projectData";
// import type { projectDataType } from "../data/projectData";
import { ProjectCard } from "./projectCard";



export function ProjectCardList({query, currentCat, sortValue}: {query: string, currentCat: Array<string>, sortValue: string}) {


    query = query.trim().toLowerCase();

    const filteredList = projectData.filter((item) => {

        let liveText

        item.live ? (liveText = "Yes") : (liveText = "No")

        const liveFilterSelected = currentCat.includes("Live");

        const catFilter = currentCat.filter(item => item !== "Live")


        const matchesLive = !liveFilterSelected || item.live


        const matchesCat = catFilter.length === 0 || catFilter.includes(item.category)

        const matchesSearch = (
            item.name.trim().toLowerCase().includes(query) ||
            String(item.id).includes(query) ||
            item.category.trim().toLowerCase().includes(query) ||
            liveText.trim().toLowerCase().includes(query) 
        )

        return (
            matchesSearch && matchesLive && matchesCat
        )

    })

    if (sortValue) {

        if (sortValue === "A-Z") {
            filteredList.sort((a, b) => a.name.localeCompare(b.name))
        }
        else if (sortValue === "Z-A") {
            filteredList.sort((a, b) => b.name.localeCompare(a.name))
        }
        else if (sortValue === "Cat A-Z") {
            filteredList.sort((a, b) => a.category.localeCompare(b.category))
        }
        else if (sortValue === "Cat Z-A") {
            filteredList.sort((a, b) => b.category.localeCompare(a.category))
        }    
    }


    const list = filteredList.map((item) => {


        return (
            <ProjectCard
            key = {item.id}
            name = {item.name}
            image = {item.image}
            category = {item.category}
            id = {item.id}
            live = {item.live}
            />
        )

    })


    return (
        <div className="cards">
            {list}
        </div>
    )
}