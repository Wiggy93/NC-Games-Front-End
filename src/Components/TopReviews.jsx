import { useEffect, useState } from "react";
import { getReviews } from "../Utils/api";
import { ErrorPage } from "./ErrorPage";
import { Link } from "react-router-dom";
import { dateConverter } from "../Utils/utils";

import styles from "../CSS/Reviews.module.css";

export const TopReviews = () => {
  const [topReviews, setTopReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ display: "none" });
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getReviews(undefined, "votes", "desc")
      .then((data) => {
        console.log(data, "get reviews data");
        setTopReviews([data.reviews[0], data.reviews[1], data.reviews[2]]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
        setIsLoading(false);
      });
  }, []);

  //   console.log(topReviews, "top 3 reviews");

  if (isLoading) return <p>Loading top reviews...</p>;

  if (err) {
    return (
      <div>
        <ErrorPage err={err} />
      </div>
    );
  }

  return (
    <ul className={styles.reviewsBox}>
      {topReviews.map((review) => {
        return (
          <div key={review.review_id} className={styles.topSingleReviewBox}>
            <Link
              to={`/reviews/${review.review_id}`}
              style={{ textDecoration: "none" }}
            >
              <article>
                <h2>{review.title}</h2>
                <h3>{review.owner}</h3>
                <p>{dateConverter(review.created_at)}</p>

                <p>Votes: {review.votes}</p>
                <p>Number of Comments: {review.comment_count}</p>
              </article>
            </Link>
          </div>
        );
      })}
      <p style={errorMessage}>Error loading top reviews</p>
    </ul>
  );
};
