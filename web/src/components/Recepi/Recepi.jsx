import './Recepi.css'
import toast from './img/toast.jpg'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecepiData (props) {
    const [redirectTo, setRedirectTo] = useState("/");

    const { id } = useParams();
    const TagsList =  <p className='Tag'>{redirectTo.ing_name0}</p>;
    //const Ingridients = props.ingridients.map((d) => <li>{d}</li>)
    //tdtd
    useEffect(() => {
        const getProductDetails = async (productId) => {
            try {
                const response = await fetch('http://localhost:81/food.php?id=' + productId);
                const jsonData = await response.json();
                setRedirectTo(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getProductDetails(id);
    }, []);


    return(
        <div className='RecepiData'>
            <img className='RecepiImg' src={props.iamge} />
            <h2 className='Text'>{redirectTo.dish_name} <span>callories: {redirectTo.calories}</span></h2>
            <div className='TagsList'><h2 className='Text' id="Tags">Tags :</h2>{ TagsList }</div>
            <h2 className='Text'>Ingridients:</h2>
            <ul className='Text'>
                { redirectTo.ing_name0 }
            </ul>
            {/*<h2 className='Text'>Instruction:</h2>*/}
            {/*<p className='Text'>{ props.instruction}</p>*/}
        </div>
    )
}

export default function Recepi () {
    var foodSample = {name: "Toast with banana flavor b l a b l a b l a b b l a", image: toast, callories: "865",
    tags: ["Bread", "Banana", "Berries"],
    ingridients: ["1 slice whole wheat bread", "1/2 banana", "1.5 tbsp peanut butter", "1/2 tsp chia seeds", "1/2 tsp unsweetened coconut flakes", "1/2 tsp maple syrup or honey"],
    instruction: "Toast bread until nice and crisp.Smash banana into bread with knife. Top with peanut butter.Sprinkle on chia seeds and coconut and drizzle with maple. Cut into four pieces to enjoy bite by bite."}

    return (
        <main>
            <div className='Recepi'>
            <h2 className='Text'>Food <b>recipes</b></h2>
                <RecepiData iamge={toast} name={foodSample.name} callories={foodSample.callories} tags={foodSample.tags} ingridients={foodSample.ingridients} instruction={foodSample.instruction} />
            </div>
        </main>
    )
}