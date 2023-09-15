import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [searching, setSearching] = useState(false);

    const handleMovieClick = (movieId) => {
        navigate(`/movies/${movieId}`);
    };

    const handleSearch = async () => {
        setSearching(true);
        try {
            const apiKey = '04c1bd5448c54002d65fac4fbb7721e8';
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }

            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error("Error fetching search results", error);
        } finally {
            setSearching(false);
        }
    };

    function convertToUTCDate(releaseDate) {
        if (!releaseDate) {
            return "N/A";
        }
    
        const localDate = new Date(releaseDate);
    
        if (isNaN(localDate.getTime())) {
            return "N/A";
        }
    
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
        async function fetchTopMovies() {
            try {
                const apiKey = '04c1bd5448c54002d65fac4fbb7721e8';
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch top movies");
                }

                const data = await response.json();
                setMovies(data.results.slice(0, 10)); // Limit to the first 10 movies
                setLoading(false);
            } catch (error) {
                console.error("Error fetching top movies", error);
            }
        }

        fetchTopMovies();
    }, []);

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for movies"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {searching ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className="main-movie-details">
                        {loading ? (
                            <p>Loading ... </p>
                        ) : (
                            movies.length > 0 && (
                                <div
                                    className="main-movie-card"
                                    onClick={() => handleMovieClick(movies[0].id)}
                                >
                                    <div className="main-movie-poster-container">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${movies[0].poster_path}`}
                                            alt={movies[0].title}
                                            className="main-movie-poster"
                                        />
                                    </div>
                                    <h1 className="main-movie-title">{movies[0].title}</h1>
                                    <p className="main-movie-release-date">Release Date:
                                        {convertToUTCDate(movies[0].release_date)}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
               

                    <div className="movie-grid">
                        {loading ? (
                            <p>Loading ... </p>
                        ) : (
                            movies.map((movie, index) => (
                                <div
                                    className="movie-card"
                                    key={movie.id}
                                    onClick={() => handleMovieClick(movie.id)}
                                >
                                    <div className="movie-poster-container">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                            alt={movie.title}
                                            className="movie-poster"
                                        />
                                    </div>
                                    <h2 className="movie-title">{movie.title}</h2>
                                    <p className="main-movie-release-date">Release Date: {convertToUTCDate(movie.release_date)}</p>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}

export default Home;
