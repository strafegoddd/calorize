import './Settings.css'
import TagPicker from 'rsuite/TagPicker';
import 'rsuite/TagPicker/styles/index.css';

export default function Settings () {
    const Users = ['user1', 'user2'].map(
        item => ({ label: item, value: item })
    );
    return (
        <main>
            <div className='Settings'>
                <h1 className='Text'>Choose user</h1>
                <select className="UserSelector">
                    <option class="NameText">user1</option>
                    <option class="NameText">user2</option>
                </select>
            </div>
        </main>
    )
}