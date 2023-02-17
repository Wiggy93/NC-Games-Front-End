import { useEffect, useState } from "react";
import { ReviewQueries } from "./ReviewQueries";
import { ErrorPage } from "./ErrorPage";
import { getReviews, updateVotes } from "../Utils/api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import styles from "../CSS/Reviews.module.css";
import { dateConverter } from "../Utils/utils";

export const Reviews = ({
  categories,
  setCategories,
  category,
  setCategory,
  selectedFilterOption,
  setSelectedFilterOption,
  selectedSortBy,
  setSelectedSortBy,
  selectedOrder,
  setSelectedOrder,
}) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ display: "none" });
  const [err, setErr] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetFilters, setResetFilters] = useState(false);

  const [sortBy, setSortBy] = useState(undefined);
  const [orderBy, setOrderBy] = useState("desc");

  const navigate = useNavigate();

  let categoryQuery = searchParams.get("category");

  useEffect(() => {
    setIsLoading(true);
    if (resetFilters === true) {
      setCategory(undefined);
      setSortBy(undefined);
      setOrderBy("desc");
    }
    // if (sortBy === "commentCount") {
    //     (category !== undefined ? getReviews(category, undefined, orderBy) : getReviews(categoryQuery, undefined, orderBy))
    // .then((data)=>{
    //         console.log(data, "comment count sort")
    //     })
    // } else
    (category !== undefined
      ? getReviews(category, sortBy, orderBy)
      : getReviews(categoryQuery, sortBy, orderBy)
    )
      .then((data) => {
        setReviews(data.reviews);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
        setIsLoading(false);
      });
  }, [resetFilters, categoryQuery, category, sortBy, orderBy]);

  if (err) {
    return (
      <div>
        <ErrorPage err={err} />
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResetFilters(true);
    setSelectedFilterOption(null);
    setSelectedOrder(null);
    setSelectedSortBy(null);
    getReviews()
      .then((data) => {
        setReviews(data.reviews);
        setIsLoading(false);
        setResetFilters(false);
      })
      .then(() => {
        navigate("/reviews");
        setResetFilters(false);
      })
      .then(() => {
        navigate("/reviews");
      });
  };

  if (isLoading) return <p>Loading reviews...</p>;

  const updateVoteButton = (review_id, e) => {
    setReviews((currentReviews) => {
      return currentReviews.map((review) => {
        if (review.review_id === review_id) {
          return { ...review, votes: review.votes + Number(e) };
        }
        return review;
      });
    });
    setErrorMessage({ display: "none" });
    updateVotes(review_id, Number(e)).catch((err) => {
      console.log(err);
      setReviews((currentReviews) => {
        return currentReviews.map((review) => {
          if (review.review_id === review_id) {
            return { ...review, votes: review.votes - Number(e) };
          }
          return review;
        });
      });
      setErrorMessage({ display: "block" });
    });
  };

  return (
    <main>
      <ReviewQueries
        setCategories={setCategories}
        categories={categories}
        setCategory={setCategory}
        setSortBy={setSortBy}
        setOrderBy={setOrderBy}
        selectedFilterOption={selectedFilterOption}
        setSelectedFilterOption={setSelectedFilterOption}
        selectedSortBy={selectedSortBy}
        setSelectedSortBy={setSelectedSortBy}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
      <Link to={"/reviews/"}>
        <h2 onClick={handleSubmit}>Clear filters</h2>
      </Link>
      <ul className={styles.reviewsBox}>
        {reviews.map((review) => {
          return (
            <div key={review.review_id} className={styles.singleReviewBox}>
              <Link
                to={`/reviews/${review.review_id}`}
                style={{ textDecoration: "none" }}
              >
                <article>
                  <h2>{review.title}</h2>
                  <h3>{review.owner}</h3>
                  <p>{dateConverter(review.created_at)}</p>
                  <h4>Category: {review.category}</h4>
                  <p>Game designer: {review.designer}</p>
                  <p className={styles.singleReviewBody}>
                    {review.review_body}
                  </p>
                  <p>Votes: {review.votes}</p>
                  <p>Number of Comments: {review.comment_count}</p>
                </article>
              </Link>
              <button
                value={1}
                onClick={(e) =>
                  updateVoteButton(review.review_id, e.target.value)
                }
              >
                Vote: +1
              </button>
              {/* for accessibility put thumbs up/down for +1 or -1 */}
              <button
                value={-1}
                onClick={(e) =>
                  updateVoteButton(review.review_id, e.target.value)
                }
              >
                Vote: -1
              </button>

              <p style={errorMessage}>Error updating review votes</p>
            </div>
          );
        })}
      </ul>
    </main>
  );
};
