import './Recipes.css'
import toast from './img/toast.jpg'
import pizza from './img/pitsa.jpg'
import { Link } from 'react-router-dom'

function RecipesList () {
    // function post(){
    //     fetch("http://localhost:81/recipes.php", {
    //         method: 'POST',
    //         header: {
    //             'Content-Type' : 'application/x-www-form-urlencoded',
    //         },
    //         body: JSON.stringify({action:1})
    //     })
    //         .then(response => response.text())
    //         .then(response =>{
    //             console.log(response);
    //         })
    // }
    fetch("http://localhost:81/recipes.php")
        .then(res => res.json())
        .then(data => {
            let elements = document.getElementsByClassName('FoodSign');
            for (let i = 0; i < elements.length; i++) {
                elements[i].innerHTML = JSON.stringify(data[i].dish_name);
            }
        })


    let name = "soapd";
    let i = 0;
    let eat;


    // dish.then(data => {
    //     while (i < data.length){
    //         eat.push(data[i].dish_name);
    //         i++;
    //     }
    // });
    return (
        <dl className="ListFood">
            {/*<Link className="FoodList" to="/food"><Food name={name[0].dish_name} image={toast}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name[1].dish_name} image={toast}/></Link>*/}
            {/*<Link className="FoodList" to="/food"><Food name={name[1].dish_name} image={pizza}/></Link>*/}
            <Link className="FoodList" to="/food"><Food name={name} image={pizza}/></Link>
            <Link className="FoodList" to="/food"><Food name={name} image={toast}/></Link>
            <Link className="FoodList" to="/food"><Food name={name} image={toast}/></Link>
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