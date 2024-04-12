import PropTypes from 'prop-types';
import "./project.css"


const Project = ({id, title, content, img}) => {
    return (
        <div key={id}>
            <h1>{id}</h1>
            <h1>{title}</h1>
            <h3>{content}</h3>
            <img src={img} alt="" />
        </div>
    )
}


Project.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};


export default Project