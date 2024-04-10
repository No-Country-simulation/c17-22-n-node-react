/* eslint-disable react/prop-types */
import "./project.css"


const Project = ({id, title}) => {
    return (
        <div key={id}>
            <h1>{title}</h1>
        </div>
    )
}


export default Project