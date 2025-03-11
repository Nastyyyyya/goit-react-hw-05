import React, { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import style from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (query === "") return;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=cf90c7e71cb3b075c8b58dd255fc4b7b`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSearch} className={style.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies"
          className={style.input}
        />
        <button type="submit" className={style.button}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
