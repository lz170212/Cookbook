import sampleImg1 from '../img/sample1.jpeg'
import sampleImg2 from '../img/sample2.jpeg'
import sampleImg3 from '../img/sample3.jpeg'
import sampleImg4 from '../img/sample4.jpeg'
import sampleImg5 from '../img/sample5.jpeg'
import sampleImg6 from '../img/sample6.jpeg'
import sampleImg7 from '../img/sample7.jpeg'
import { FaClock } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const imgs = [sampleImg1, sampleImg2, sampleImg3, sampleImg4, sampleImg5, sampleImg6, sampleImg7 ]

const RecipeCard = ({ name, ingredients, cookTime = 30, index }) => {

    let id = "0001"

    return (
        <Link to={`/recipe/${id}`}>
            <div className="border-2 w-[350px] h-[350px] rounded-md">
                <div className='h-[60%] w-full flex items-center justify-center'>
                    <img src={imgs[index % 7]} className='h-full w-full'/>
                </div>
                
                <div>
                    <p className='font-gelasio text-xl line-clamp-1 text-blue-500 text-center my-3'>{name}</p>
                    <p className='line-clamp-2 px-3 mb-1'><span className='font-bold'>Ingredients:</span> {ingredients}</p>
                    <p className='px-3'><FaClock className='inline-block'/> {cookTime}min</p>
                </div>
            </div>
        </Link>
    )
};

export default RecipeCard;