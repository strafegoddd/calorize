import './Header.css'
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";



function HeaderElem ( { children }) {
  return (
    <h2>{children}</h2>
  )
}

export default function Header () {
    return (
        <header className="Header">
          <h1 className="Name">Meal Planner.</h1>
          <Link className='Head' to="/"><HeaderElem>Planner</HeaderElem></Link>
          <Link className='Head' to="/filtres"><HeaderElem>Filters</HeaderElem></Link>
          <Link className='Head' to="/recipes"><HeaderElem>Recipes</HeaderElem></Link>
          <Link className='Head' to="/settings"><HeaderElem>Settings</HeaderElem></Link>

        </header>
    )
  }
  