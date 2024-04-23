import './Settings.css'
import TagPicker from 'rsuite/TagPicker';
import 'rsuite/TagPicker/styles/index.css';
import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
let log;

export default function Settings () {
    const [redirectTo, setRedirectTo] = useState("/");
    useEffect(() => {
        const fetchLog = async () => {
            try {
                const response = await fetch('http://localhost:81/users.php');
                const jsonData = await response.json();
                setRedirectTo(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchLog();
    }, []);

    function saveLog(){
        localStorage.clear();
        let myElem = document.getElementById("userSelect")
        let selectedUser = myElem.value; // Получаем выбранного пользователя
        const myJson = {
            username: selectedUser
        };
        // Отправляем выбранного пользователя на сервер для авторизации
        fetch("http://localhost:81/login.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myJson) // Отправляем только имя пользователя
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Ошибка сети");
                }
            })
            .then(data => {
                console.log(data);
                log=myJson.username;
            })
            .catch(error => {
                // Ошибка сервера
                alert("Ошибка: " + error.message);
            });
        localStorage.setItem('login', selectedUser);
    }

    return (
        <main>
            <div className='Settings'>
                <h1 className='Text'>Choose user</h1>
                <select id="userSelect" className="UserSelector">
                    {(() => {
                        const options = [];
                        for (let i = 0; i < redirectTo.length; i++) {
                            let user = redirectTo[i].login;
                            //console.log(user);
                            options.push(<option>{user}</option>);
                        }
                        return options;
                    })()}
                </select>
                <button onClick={saveLog}>SAVE LOG</button>
            </div>
        </main>
    )
}