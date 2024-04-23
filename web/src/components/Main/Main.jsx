import './Main.css'
import toast from './img/toast.jpg'
import pizza from './img/pitsa.jpg'
import {Link, redirect} from 'react-router-dom'
import React, { useState, useEffect } from 'react';

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
    let breakfast = [];
    let dinner = [];
    let supper = [];
    const [redirectTo, setRedirectTo] = useState("/");
    var name = "Toast with banana flavor b l a b l a b l a b b l a"
    let login = localStorage.getItem('login');
    let logSend = {
        login: login
    };

    useEffect(() => {
    fetch('http://localhost:81/planner.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(logSend)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Ошибка сети");
            }
        })
        .then(data => {
            // Получаем ответ от сервера и выводим его в консоль
            setRedirectTo(data);
            //console.log(data);
        })
    }, []);
    let linkStr = [];
    function swapping(){
        for (let i = 0; i < redirectTo.length; i++){
            linkStr.push('/food/' + String(redirectTo[i].dish_id));
        }
    }
    swapping();


    return (
        <dl className="DayFood">
            {(() => {
                const links = [];
                let isFindBreakfast = false;
                let isFindDinner = false;
                let isFindSupper = false;
                //console.log(redirectTo);
                for (let k = 0; k < redirectTo.length; k++){
                    for (let i = 0; i < redirectTo.length; i++){
                        const id = linkStr[i];
                        if((redirectTo[i].eating_time === 'Breakfast') && (isFindBreakfast === false)){
                            isFindBreakfast = true;
                            links.push(<Link className="FoodTime" to={id}><Food time="Breakfast" name={ redirectTo[i].dish_name } image={redirectTo[i].dish_image_url} /></Link>)
                            isFindDinner = false;
                            isFindSupper = false;
                        }
                        else if (isFindBreakfast === false){
                            isFindDinner = true;
                            isFindSupper = true;
                        }

                        if((redirectTo[i].eating_time === 'Dinner') && (isFindDinner === false)){
                            isFindDinner = true;
                            links.push(<Link className="FoodTime" to={id}><Food time="Dinner" name={ redirectTo[i].dish_name } image={redirectTo[i].dish_image_url} /></Link>)
                            isFindSupper = false;
                        }
                        else if (isFindDinner === false){
                            isFindSupper = true;
                        }

                        if((redirectTo[i].eating_time === 'Supper') && (isFindSupper === false)){
                            isFindSupper = true;
                            links.push(<Link className="FoodTime" to={id}><Food time="Supper" name={ redirectTo[i].dish_name } image={redirectTo[i].dish_image_url} /></Link>)
                        }

                        // if (i === redirectTo.length - 1){
                        //     if (isFindDinner === false){
                        //         isFindDinner = true;
                        //         links.push(<Link className="FoodTime"><Food time="Dinner" name={'No a dish'} /></Link>)
                        //         for (let i = 0; i < redirectTo.length; i++) {
                        //             if((redirectTo[i].eating_time === 'Supper') && (isFindSupper === false)){
                        //                 isFindSupper = true;
                        //                 links.push(<Link className="FoodTime" to={id}><Food time="Supper" name={ redirectTo[i].dish_name } image={redirectTo[i].dish_image_url} /></Link>)
                        //             }
                        //         }
                        //     }
                        // }
                    }
                }
                return links;
            })()}
            {/*<Link className="FoodTime" to="/food"><Food time="Lunch" name={ name } image={toast} /></Link>*/}
            {/*<Link className="FoodTime" to="/food"><Food time="Dinner" name={ dinner[0].dish_name } image={dinner[0].dish_name} /></Link>*/}
            {/*<Link className="FoodTime" to="/food"><Food time="Supper" name={ name } image={pizza} /></Link>*/}
        </dl>
    )
}

function Food (props) {
    const [redirectTo, setRedirectTo] = useState("/");
    let count = 0;
    let foodArr = [];
    let changeStr;
    var ChangeLink = '/change/' + props.time;
    let perem = localStorage.getItem('login');
    let logSend = {
        login: perem
    };


    useEffect(() => {
        fetch('http://localhost:81/planner.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logSend)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Ошибка сети");
                }
            })
            .then(data => {
                // Получаем ответ от сервера и выводим его в консоль
                setRedirectTo(data);
                //console.log(data);
            })
    }, []);

    function changeFood(){
        let sch = 0;
        if (count >= foodArr.length){
            count = 0;
        }
        foodArr = [];
        for (let i = 0; i < redirectTo.length; i++){
            if (redirectTo[i].eating_time === props.time) {
                foodArr.push(redirectTo[i]);
            }
            sch = 0;
            if (props.time === 'Breakfast'){
                sch = 0;
            } else if (props.time === 'Dinner'){
                sch = 1;
            } else if (props.time === 'Supper'){
                sch = 2;
            }
        }
        for (let i = count; i < foodArr.length; i++){
            if (foodArr[i].dish_name !== changeStr){
                let elem = document.getElementsByClassName('FoodName');
                elem[sch].textContent = foodArr[i].dish_name;
                let img = document.getElementsByClassName('ScheduleImg');
                img[sch].src = foodArr[i].dish_image_url;
                changeStr = foodArr[i].dish_name;
                count++;
                break;
            }
            else if (i === foodArr.length - 1){
                let elem = document.getElementsByClassName('FoodName');
                elem[sch].textContent = foodArr[0].dish_name;
                let img = document.getElementsByClassName('ScheduleImg');
                img[sch].src = foodArr[i].dish_image_url;
                changeStr = foodArr[0].dish_name;
                count = 0;
                break;
            }
        }
    }


    return (
        <div className="Rectangle">
            <h2 className='FoodTime'>{props.time}</h2>
            <img className='ScheduleImg' src={props.image} />
            <p class="FoodName">{ props.name }</p>
            <Link className="ChangeLink" onClick={changeFood}>Change</Link>
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