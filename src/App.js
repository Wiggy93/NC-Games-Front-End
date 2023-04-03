import "./CSS/App.css";

import { Categories } from "./Components/Categories";
import { Reviews } from "./Components/Reviews";
import { Users } from "./Components/Users";
import { NavBar } from "./Components/NavBar";
import { Comments } from "./Components/Comments";
import { TopReviews } from "./Components/TopReviews";
import { NotFound } from "./Components/NotFound";

import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { SingleReview } from "./Components/SingleReview";
import { SingleUser } from "./Components/SingleUser";

function App() {
  const [categories, setCategories] = useState([]);
  const [currentReview, setCurrentReview] = useState({});
  const [category, setCategory] = useState(undefined);
  const [selectedFilterOption, setSelectedFilterOption] = useState(null);
  const [selectedSortBy, setSelectedSortBy] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="App">
      <NavBar />
      <main>
        <header>
          <h1>The BoardGamer</h1>
        </header>
        <h2>
          Source of all your board game reviews, gossip and fierce debate over
          which is the ultimate board game
        </h2>
        <br></br>
        <br></br>
        <Link to={"/reviews"}>Find the reviews</Link>
        <br></br>
        <br></br>
        <h3>Top Reviews</h3>
        <br></br>
        <br></br>
        <TopReviews />
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route
            path="/categories"
            element={
              <Categories
                categories={categories}
                setCategories={setCategories}
                setCategory={setCategory}
              />
            }
          ></Route>

          <Route
            path="/reviews/*"
            element={
              <Reviews
                categories={categories}
                setCategories={setCategories}
                category={category}
                setCategory={setCategory}
                selectedFilterOption={selectedFilterOption}
                setSelectedFilterOption={setSelectedFilterOption}
                selectedSortBy={selectedSortBy}
                setSelectedSortBy={setSelectedSortBy}
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
              />
            }
          ></Route>

          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/:username" element={<SingleUser />}></Route>
          <Route
            path="/reviews/:reviewid"
            element={
              <SingleReview
                currentReview={currentReview}
                setCurrentReview={setCurrentReview}
              />
            }
          ></Route>
          <Route
            path="/reviews/:reviewid/comments"
            element={<Comments />}
          ></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
