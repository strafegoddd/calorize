import './Filtres.css'
import TagPicker from 'rsuite/TagPicker';
import 'rsuite/TagPicker/styles/index.css';

export default function Filters () {
    const FoodList = ['Chicken', 'Pork', 'Seafood', 'Duck', 'Pickles', 'Carrot', 'Broccoli', 'Potato'].map(
        item => ({ label: item, value: item })
    );
    return (
        <main>
            <div className='Filtres'>
                <h2 className='Text'>Meal plan filter</h2>
                <div className='TagSelector'>
                    <TagPicker className="TagEat" placeholder="Select what you want to eat" data={FoodList} />
                    <TagPicker className="TagNoEat" placeholder="Select what you dont want to eat" data={FoodList} />
                </div>
            </div>
            
        </main>
    )
}