import { FaClock } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {

    let { name, image, ingredients, prep_time, _id: id } = recipe;

    return (
        <Link to={`/recipe/${id}`}>
            <div className="border-2 w-[350px] h-[350px] rounded-md">
                <div className='h-[60%] w-full flex items-center justify-center'>
                    <img src={image} className='h-full w-full rounded-md'/>
                </div>
                
                <div>
                    <p className='font-gelasio text-xl line-clamp-1 text-blue-500 text-center my-3'>{name}</p>
                    <p className='line-clamp-2 px-3 mb-1'><span className='font-bold'>Ingredients:</span> {ingredients}</p>
                    <p className='px-3'><FaClock className='inline-block'/> {prep_time}min</p>
                </div>
            </div>
        </Link>
    )
};

export default RecipeCard;