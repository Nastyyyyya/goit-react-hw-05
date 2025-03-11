import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=cf90c7e71cb3b075c8b58dd255fc4b7b`
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <ul className={style.reviewList}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id} className={style.reviewItem}>
              <p className={style.reviewText}>
                <strong>{review.author}</strong>
              </p>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <p>We don`t have any reviews for this movie yet.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
