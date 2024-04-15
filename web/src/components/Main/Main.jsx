import './Main.css'
import toast from './img/toast.jpg'
import pizza from './img/pitsa.jpg'
import { Link } from 'react-router-dom'

function WeaksList () {
    const Weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 3']
    return (
        <dl className="Weeks">
            <li>{Weeks[0]}</li>
            <li>{Weeks[1]}</li>
            <li>{Weeks[2]}</li>
            <li>{Weeks[3]}</li>
        </dl>
    )
}

function DaysList () {
    const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return (
        <dl className="Days">
            <li>{Days[0]}</li>
            <li>{Days[1]}</li>
            <li>{Days[2]}</li>
            <li>{Days[3]}</li>
            <li>{Days[4]}</li>
            <li>{Days[5]}</li>
            <li>{Days[6]}</li>
        </dl>
    )
}

function DayFood () {
    var name = "Toast with banana flavor b l a b l a b l a b b l a"
    return (
        <dl className="DayFood">
            <Link className="FoodTime" to="/food"><Food time="Breakfast" name={ name } image={toast} /></Link>
            <Link className="FoodTime" to="/food"><Food time="Lunch" name={ name } image={toast} /></Link>
            <Link className="FoodTime" to="/food"><Food time="Dinner" name={ name } image={pizza} /></Link>
            <Link className="FoodTime" to="/food"><Food time="Supper" name={ name } image={pizza} /></Link>    
        </dl>
    )
}

function Food (props) {
    var ChangeLink = '/change/' + props.time;
    return (
        <div className="Rectangle">
            <h2 className='FoodTime'>{props.time}</h2>
            <img className='ScheduleImg' src={props.image} />
            <p class="FoodName">{ props.name }</p>
            <Link className="ChangeLink" to={ChangeLink}>Change</Link>
        </div>
    )
}

export default function Main () {
    return (
        <main>
            <div className='Schedule'>
                <h2 className='Text'>Current <b>personal</b> meal plan</h2>
                <WeaksList />
                <DaysList />
                <DayFood />
            </div>
        </main>
    )
}