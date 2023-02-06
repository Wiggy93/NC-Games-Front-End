import './App.css';

import {Categories} from './Components/Categories'
import {Reviews} from './Components/Reviews'
import {Users} from './Components/Users'

import {Routes, Route} from 'react-router-dom'
import { useState } from 'react';

function App() {
  const [categories, setCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState('tickle122')

  return (
    <div className="App">
      <header>
        <h1>NC Games</h1>
        <Routes>
          <Route path='/categories' element={<Categories categories={categories} setCategories={setCategories}/>}></Route>
          <Route path='/reviews/*' element={<Reviews categories={categories} setCategories={setCategories}/>}></Route>
          <Route path='users' element={<Users/>}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
