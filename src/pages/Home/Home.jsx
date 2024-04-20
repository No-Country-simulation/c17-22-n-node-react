import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories, getProjects, getSubCategories } from "../../redux/actions/actions";
import { CategoriesBar } from "../../Components/CategoriesBar/CategoriesBar"
import { Cards } from "../../Components/Cards/Cards"
import Carousel from "../../Components/Carousel/Carousel";
import "./home.css"


const Home = () => {
    const dispatch = useDispatch()
    const projectsOnScreen = useSelector((state) => state.projectsOnScreen)
    const categories = useSelector((state) => state.categories)
    const subCategories = useSelector((state) => state.subCategories)

    useEffect(()=>{
        dispatch(getProjects())
        dispatch(getCategories())
        dispatch(getSubCategories())
    }, [dispatch])

    return (
        
        <>
            <div className="container-fluid containerText">
                <Carousel />
            </div>
            <div>
                <CategoriesBar categories={categories} subCategories={subCategories} />
            </div>
            <div>
                <Cards projects={projectsOnScreen}/>
            </div>
        </>
    )
}


export default Home