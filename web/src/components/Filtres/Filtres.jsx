import './Filtres.css'
import TagPicker from 'rsuite/TagPicker';
import React, { useState, useEffect } from 'react';
import 'rsuite/TagPicker/styles/index.css';
import { Button } from 'react-bootstrap';
import myJson from '../Settings/Settings'

export default function Filters () {
    const [redirectTo, setRedirectTo] = useState("/");
    const login = localStorage.getItem('login');
    if (!login) {
        console.log('No')
    }
    else{
        console.log(login);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:81/filters.php');
                const jsonData = await response.json();
                setRedirectTo(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    let allList = [];
    for (let i = 0; i < redirectTo.length; i++){
        allList.push(redirectTo[i].ingridient_name);
    }
    const FoodList = allList.map(
        item => ({ label: item, value: item })
    );

    function SavingFilters(){
        //console.log(myJson);
        let elem = document.getElementsByClassName('rs-tag-text');
        let divElement = document.getElementsByClassName('TagEat');
        let eatList = [];
        let noEatList = [];
        for (let i = 0; i < elem.length; i++) {
            if(divElement[0].contains(elem[i])){
                eatList.push(elem[i].textContent);
            }
            else{
                noEatList.push(elem[i].textContent);
            }
        }
        let dataToSend = {
            eatList: eatList,
            noEatList: noEatList,
            login: login
        };

        //console.log(dataToSend);
        fetch('http://localhost:81/SaveFilters.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Ошибка сети");
                }
            })
            .then(data => {
                // Получаем ответ от сервера и выводим его в консоль
                console.log(data);
            })
            // .catch(error => {
            //     console.error('Ошибка:', error);
            // });


    }

    return (
        <main>
            <div className='Filtres'>
                <h2 className='Text'>Meal plan filter</h2>
                <div className='TagSelector'>
                    <div className='leftSelector'>
                        <Button className="eatButton" variant="outlined" onClick={SavingFilters}>Choose</Button>
                        <TagPicker className="TagEat" placeholder="Select what you want to eat" data={FoodList} />
                    </div>
                    <div></div>
                    <div className='rightSelector'>
                        <Button className="noEatButton" variant="outlined">Choose</Button>
                        <TagPicker className="TagNoEat" placeholder="Select what you dont want to eat" data={FoodList} />
                    </div>
                </div>
                {/*<button className='Save' onClick={SavingFilters()}>SAVE</button>*/}
            </div>
            
        </main>
    )
}