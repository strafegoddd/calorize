import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import TagPicker from 'rsuite/TagPicker';
import 'rsuite/TagPicker/styles/index.css';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Filtres from './components/Filtres/Filtres'
import Recipes from './components/Recipes/Recipes'
import Settings from './components/Settings/Settings'
import Recepi from './components/Recepi/Recepi'


function App() {

  var foodSample = {name: "Toast with banana flavor b l a b l a b l a b b l a", img: "./components/Main/img/toast.jpg", callories: "865",
  tags: ["Bread", "Banana", "Berries"],
  ingridients: ["1 slice whole wheat bread", "1/2 banana", "1.5 tbsp peanut butter", "1/2 tsp chia seeds", "1/2 tsp unsweetened coconut flakes", "1/2 tsp maple syrup or honey"],
  recipe: "Toast bread until nice and crisp.Smash banana into bread with knife. Top with peanut butter.Sprinkle on chia seeds and coconut and drizzle with maple. Cut into four pieces to enjoy bite by bite."}
  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={ <Main /> }/>
            <Route path="/filtres" element={ <Filtres /> }/>
            <Route path="/recipes" element={ <Recipes /> }/>
            <Route path="/settings" element={ <Settings /> }/>
            <Route path="/food" element={ <Recepi /> }/>
        </Routes>

    </div>
  );
}

export default App;
