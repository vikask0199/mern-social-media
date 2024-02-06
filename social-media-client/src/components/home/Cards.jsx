import { Link, useNavigate } from "react-router-dom";

const Cards = ({ img, content, link }) => {
    const navigate = useNavigate()
    const navigateToMain = (link) => {
        navigate(link)
    }

    return (
        <Link to={link} className='h-40 w-40 flex items-center justify-center flex-col rounded-md shadow-lg cursor-pointer hover:h-44 hover:w-44 duration-300' onClick={() => navigateToMain(link)}>
            <div className="h-full">
                <img src={img} alt="watch togather" className="h-full w-full object-fit rounded-tl-md rounded-tr-md"/>
            </div>
            <div className="h-1/4 font-semibold flex items-center justify-center">
                {content}
            </div>
        </Link>
    )
}

export default Cards