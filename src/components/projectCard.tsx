import type { projectDataType } from "../data/projectData"


export function ProjectCard({name, image, id, category, live}: projectDataType) {

    return(
        <div className="card">

            <div className="card-content">
                <img className="card-img" src={image}></img>
                <h2>{name}</h2>
                <h3>Category: {category}</h3>
                <p>ID: {id}</p>
                <p>Is live?: {live ? "Yes" : "No"}</p>
            </div>
        </div>
    )
}