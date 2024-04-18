import './Filtres.css'
import TagPicker from 'rsuite/TagPicker';
import React, { useState, useEffect } from 'react';
import 'rsuite/TagPicker/styles/index.css';

export default function Filters () {
    const [redirectTo, setRedirectTo] = useState("/");

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
    let eatList = [];
    let noEatList = [];
    for (let i = 0; i < redirectTo.length; i++){
        allList.push(redirectTo[i].ingridient_name);
    }
    const FoodList = allList.map(
        item => ({ label: item, value: item })
    );

    function SavingFilters(){
        let elem = document.getElementsByClassName('rs-tag-next');
        let divElement = document.getElementsByClassName('TagEat');
        for (let i = 0; i < elem.length; i++) {
            if(divElement[0].contains(elem[i])){
                eatList.push(elem[i]);
            }
            else{
                noEatList.push(elem[i]);
            }
        }
        let dataToSend = {
            eatList: eatList,
            noEatList: noEatList
        };

        fetch('http://localhost:81/SaveFilters.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
            .then(response => response.json())
            .then(data => {
                // Получаем ответ от сервера и выводим его в консоль
                console.log(data);
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });


    }


    return (
        <main>
            <div className='Filtres'>
                <h2 className='Text'>Meal plan filter</h2>
                <div className='TagSelector'>
                    <TagPicker className="TagEat" placeholder="Select what you want to eat" data={FoodList} />
                    <TagPicker className="TagNoEat" placeholder="Select what you dont want to eat" data={FoodList} />
                </div>
                <button className='Save' onClick={SavingFilters()}>SAVE</button>
            </div>
            
        </main>
    )
}