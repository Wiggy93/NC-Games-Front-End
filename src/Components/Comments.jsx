import { AddComment } from "./AddComment";
import { RemoveComment } from "./RemoveComment";
import { ErrorPage } from "./ErrorPage";
import { getCommentsById, updateCommentVotes } from "../Utils/api";
import { dateConverter } from "../Utils/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../CSS/Comments.module.css";

export const Comments = ({ currentUser }) => {
  const { reviewid } = useParams();
  const [allComments, setAllComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState({ display: "none" });
  const [message, setMessage] = useState("");
  const [postedMessage, setPostedMessage] = useState({ display: "none" });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [haveUpVotedIds, setHaveUpVotedIds] = useState([]);
  const [haveDownVotedIds, setHaveDownVotedIds] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getCommentsById(reviewid)
      .then((data) => {
        setAllComments(data.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
        setIsLoading(false);
      });
  }, [message]);

  const updateVoteButton = (comment_id, e) => {
    setAllComments((currentComments) => {
      return currentComments.map((comment) => {
        if (comment.comment_id === comment_id) {
          return { ...comment, votes: comment.votes + Number(e) };
        }
        return comment;
      });
    });

    if (Number(e) === 1) {
      setHaveUpVotedIds([...haveUpVotedIds, comment_id]);

      setHaveDownVotedIds(
        haveDownVotedIds.filter((number) => {
          return number !== comment_id;
        })
      );
    }

    if (Number(e) === -1) {
      setHaveDownVotedIds([...haveDownVotedIds, comment_id]);

      setHaveUpVotedIds([
        haveUpVotedIds.filter((number) => {
          return number !== comment_id;
        }),
      ]);
    }

    setErrorMessage({ display: "none" });
    updateCommentVotes(comment_id, Number(e)).catch((err) => {
      console.log(err);
      setAllComments((currentComments) => {
        return currentComments.map((comment) => {
          if (comment.comment_id === comment_id) {
            return { ...comment, votes: comment.votes - Number(e) };
          }
          return comment;
        });
      });
      setErrorMessage({ display: "block" });
    });
  };

  if (isLoading) return <p>Loading comments...</p>;

  if (allComments.length === 0) {
    return (
      <section>
        <p>No comments yet for this review</p>
        <AddComment
          className={styles.postComment}
          currentUser={currentUser}
          message={message}
          setMessage={setMessage}
          setPostedMessage={setPostedMessage}
        />
      </section>
    );
  } else if (err) {
    return <ErrorPage err={err} />;
  }

  return (
    <section>
      <div className="ol">
        {allComments.map((comment) => {
          return (
            <article className={styles.commentBox} key={comment.comment_id}>
              <p>
                Written by {comment.author} on{" "}
                {dateConverter(comment.created_at)}
              </p>
              <br></br>
              <p>{comment.body}</p>
              <p>Votes: {comment.votes}</p>
              <button
                value={1}
                onClick={(e) =>
                  updateVoteButton(comment.comment_id, e.target.value)
                }
                disabled={haveUpVotedIds.includes(comment.comment_id)}
              >
                Vote: +1
              </button>
              {/* for accessibility put thumbs up/down for +1 or -1 */}
              <button
                value={-1}
                onClick={(e) =>
                  updateVoteButton(comment.comment_id, e.target.value)
                }
                disabled={haveDownVotedIds.includes(comment.comment_id)}
              >
                Vote: -1
              </button>
              <p style={errorMessage}>Error updating comment votes</p>
            </article>
          );
        })}
      </div>
      <AddComment
        className={styles.postComment}
        currentUser={currentUser}
        message={message}
        setMessage={setMessage}
        setPostedMessage={setPostedMessage}
      />
      <p style={postedMessage}>Posted Comment!</p>
      <RemoveComment allComments={allComments} />
    </section>
  );
};
