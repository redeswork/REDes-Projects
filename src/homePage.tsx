import { useNavigate } from "react-router"
import { projects } from "./router"

export default function HomePage() {

    const navigate = useNavigate()
    return (

        <section className="section">

            <div className="wrapper">

                <h1 className="page-heading">RE Design Project Dashboard</h1>

                <div className="cards">

                    {projects.map((project) => (
                        <button
                        style={{fontSize: "var(--text-H5)"}}
                        onClick={() => navigate(project.path)}
                        key={project.path}>
                            {project.name}
                        </button>
                    ))}

                </div>

            </div>

        </section>
    )
}