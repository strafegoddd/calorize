import './Recipes.css'
import React, { useState, useEffect } from 'react';
import toast from './img/toast.jpg'
import pizza from './img/pitsa.jpg'
import { Link } from 'react-router-dom'

function RecipesList () {
    const [redirectTo, setRedirectTo] = useState("/");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:81/recipes.php');
                const jsonData = await response.json();
                setRedirectTo(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    let name = "soapd";
    let id = 333;
    let i = 0;
    let finalStr = [];
    function swapping(){
        for (let i = 0; i < redirectTo.length; i++){
            finalStr.push('/food/' + String(redirectTo[i].dish_id));
        }
    }
    swapping();

    return (
        <dl className="ListFood">
            {(() => {
                const links = [];
                for (let i = 0; i < finalStr.length; i++) {
                    const id = finalStr[i];
                    links.push(
                            <Link className="FoodList" to={id}><Food id={redirectTo[i].dish_id} name={redirectTo[i].dish_name} image={pizza}/></Link>
                    );
                }
                return links;
            })()}
            {/*<Link className="FoodList" to="/food"><Food name={name[0].dish_name} image={toast}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name[1].dish_name} image={toast}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name[1].dish_name} image={pizza}/></Link>*/}
            {/*<Link className="FoodList" to={finalStr}><Food id={redirectTo[0].dish_id} name={redirectTo[0].dish_name} image={pizza}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food id={id} name={name} image={toast}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food id={id} name={name} image={toast}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name} image={pizza}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name} image={pizza}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name} image={toast}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name} image={toast}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name} image={pizza}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name} image={pizza}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name} image={toast}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name} image={toast}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name} image={pizza}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name} image={pizza}/></Link>*/}
        </dl>
    )
}

function Food(props) {
    var ChangeLink = '/change/' + props.time;
    return (
        <div>
            <div className="RecipesList">
                <img className='ScheduleImg' src={props.image} />
                <p class="FoodSign">{ props.name }</p>
                <p class="hideId" style={{display: "none"}}>{props.id}</p>
            </div>

        </div>
    )
}

export default function Recipes () {
    return (
        <main>
            <div className='Recipes'>
                <h2 className='Text'>This is Recipes page</h2>
                <div className='RecepiData'>
                    <RecipesList />
                </div>
            </div>
        </main>
    )
}