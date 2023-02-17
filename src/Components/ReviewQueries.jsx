import { useEffect, useState } from "react";
import { getCategories } from "../Utils/api";
import { ErrorPage } from "./ErrorPage";
import styles from "../CSS/ReviewQueries.module.css";

export const ReviewQueries = ({
  setCategories,
  categories,
  setSortBy,
  setCategory,
  setOrderBy,
  selectedFilterOption,
  setSelectedFilterOption,
  selectedSortBy,
  setSelectedSortBy,
  selectedOrder,
  setSelectedOrder,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCategories()
      .then((data) => {
        setCategories(data.categories);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
        setIsLoading(false);
      });
  }, []);

  const handleSortClick = (optionValue) => {
    if (optionValue === "created_at") {
      setSelectedSortBy("Date Posted");
    } else if (optionValue === "votes") {
      setSelectedSortBy("Review Votes");
    } else if (optionValue === "owner") {
      setSelectedSortBy("Username");
    } else if (optionValue === "designer") {
      setSelectedSortBy("Game Designer");
    }
  };

  const handleOrderClick = (optionValue) => {
    if (optionValue === "asc") {
      setSelectedOrder("Sort in Ascending Order");
    } else if (optionValue === "desc") {
      setSelectedOrder("Sort in Descending Order");
    }
  };

  if (isLoading) return <p>Loading Filter Options</p>;

  if (err) {
    return (
      <div>
        <ErrorPage err={err} />
      </div>
    );
  }

  return (
    <section className={styles.querySection}>
      <form>
        <select
          name="select-category"
          onChange={(e) => {
            setCategory(e.target.value);
            setSelectedFilterOption(e.target.value);
          }}
        >
          <option value="">
            {selectedFilterOption || "Select a Game Category"}
          </option>
          {categories.map((dropdownOption) => {
            return (
              <option key={dropdownOption.slug} value={dropdownOption.slug}>
                {dropdownOption.slug}
              </option>
            );
          })}
        </select>

        <br></br>
        <br></br>

        <select
          name="select-sort"
          onChange={(e) => {
            setSortBy(e.target.value);
            handleSortClick(e.target.value);
          }}
        >
          <option value="">{selectedSortBy || "Sort by"}</option>
          <option value="created_at">Date posted</option>
          <option value="votes">Review Votes</option>
          <option value="owner">Username</option>
          <option value="designer">Game Designer</option>
          {/* <option value="commentCount">Number of Comments</option>   */}
          {/* if sorting by comment, either change backend or do sorting of array in frontend */}
        </select>
        <br></br>
        <br></br>
        <select
          onChange={(e) => {
            setOrderBy(e.target.value);
            handleOrderClick(e.target.value);
          }}
        >
          <option>{selectedOrder || "Choose a sort option"}</option>
          <option value="desc">Sort in Descending Order</option>
          <option value="asc">Sort in Ascending Order</option>
        </select>
      </form>
    </section>
  );
};
