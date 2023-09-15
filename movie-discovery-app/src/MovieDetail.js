import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './MovieDetail.css'; 

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
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
        setMovie(data);
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
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
          <div className="movie-info">
            <h1 className="title">{movie.title}</h1>
            <p className="release-date">Release Date: {convertToUTCDate(movie.release_date)}</p>
            <p className="runtime">Runtime: {movie.runtime} minutes</p>
            <p className="overview">{movie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
