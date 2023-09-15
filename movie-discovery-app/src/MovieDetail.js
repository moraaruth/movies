import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './MovieDetail.css'; 

function MovieDetails() {
  const { id } = useParams();
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  function convertToUTCDate(releaseDate) {
    const localDate = new Date(releaseDate);
    const utcDate = new Date(
      localDate.getUTCFullYear(),
      localDate.getUTCMonth(),
      localDate.getUTCDate(),
      localDate.getUTCHours(),
      localDate.getUTCMinutes(),
      localDate.getUTCSeconds()
    );

    const utcDateString = utcDate.toISOString().replace("T", " ").replace("Z", " UTC");

    return utcDateString;
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const apiKey = '04c1bd5448c54002d65fac4fbb7721e8'; 
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="movie-details-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-details">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
            alt={movies.title}
            className="movie-poster"
          />
          <div className="movie-info">
            <h1 className="title">{movies.title}</h1>
            <p className="release-date">Release Date: {convertToUTCDate(movies.release_date)}</p>
            <p className="runtime">Runtime: {movies.runtime} minutes</p>
            <p className="overview">{movies.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
