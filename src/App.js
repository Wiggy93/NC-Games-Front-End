import './CSS/App.css';

import {Categories} from './Components/Categories'
import {Reviews} from './Components/Reviews'
import {Users} from './Components/Users'
import { NavBar } from './Components/NavBar';
import { Comments } from './Components/Comments';

import {Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import { SingleReview } from './Components/SingleReview';

function App() {
  const [categories, setCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState('tickle122')
  const [searchCategory, setSearchCategory] = useState(undefined)
  const [currentReview, setCurrentReview] = useState({})

  return (
    <div className="App">
      <NavBar/>
      <main>
      <header>
        <h1>The BoardGamer</h1>
      </header>
        <Routes>       
          <Route path='/categories' element={<Categories categories={categories} setCategories={setCategories} setSearchCategory={setSearchCategory}  searchCategory={searchCategory} />}></Route>
          <Route path='/reviews/' element={<Reviews categories={categories} setCategories={setCategories}  searchCategory={searchCategory} setSearchCategory={setSearchCategory}
          />}></Route>
          <Route path='users' element={<Users/>}></Route>
          <Route path='/reviews/:reviewid' element={<SingleReview currentReview={currentReview} setCurrentReview={setCurrentReview} currentUser={currentUser}/>}></Route>
          <Route path='/reviews/:reviewid/comments' element={<Comments/>}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
