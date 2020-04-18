import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Actions = (props) => {
    const id = props.match.params.id
    const [project, setProject] = useState({})

    useEffect(() => {
        axios
            .get(`http://localhost:4000/projects/${id}`)
            .then(res => {
                setProject(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
    },[])
    console.log(project)

    return (
        <div>
            <Link to="/">
                <button>Back to Projects</button>
            </Link>
            {!project ? "" :
                <div className="window-projects">
                    <div className="project-details">
                        <h1>{project.name}</h1>
                        <h2>{project.description}</h2>
                        <p>Completed: {project.completed ? "yes": "no"}</p>
                    </div>
                    <div>
                        <h3>Actions</h3>
                        {!project.actions ? "" :
                            project.actions.map((x,i) =>(
                            <div key={i} className="action">
                                <h4>{x.description}</h4>
                                <p>{x.notes}</p>
                            </div>
                        ))}
                    </div>
                </div>
            }
           
        </div>
    )
}

export default Actions;