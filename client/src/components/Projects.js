import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Projects = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:4000/projects/`)
            .then(res => {
                setProjects(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    //console.log(projects)

    return(
        <div className="window-projects">
            <h1>Projects</h1>
            {projects.map((x,i) => (
                <div key={i} className="project-item">
                    <Link to={`/actions/${x.id}`}>
                        {x.name}
                    </Link>   
                </div>
            ))}
        </div>
    )
}

export default Projects;