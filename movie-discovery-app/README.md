# Movie App

- This is a simple React-based movie app that allows users to view and search for movie details. It fetches movie data from The Movie Database (TMDb) API and displays it in an organized and user-friendly manner.

## Features

- View the top-rated movies by default.
- Search for movies using keywords.
- Click on a movie to view its details.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- React Router: For routing within the application.
- CSS: For styling the user interface.
- The Movie Database (TMDb) API: To fetch movie data.

## Installation

1. Clone the repository to your local machine:

``` git clone https://github.com/your-username/movie-app.git```

2. Change into the project directory:

``` cd movie-app ```

3. Install the required dependencies:

``` npm install ```

4. Create a .env file in the root directory of the project and add your TMDb API key like this:

```REACT_APP_TMDB_API_KEY= 04c1bd5448c54002d65fac4fbb7721e8```

5. Start the development server:

``` npm start ```

6. Open your web browser and visit http://localhost:3000 to use the app.

## Usage

- When the app loads, you'll see a list of the top-rated movies.
- To search for a movie, type a keyword into the search bar and click the "Search" button.
- Click on a movie card to view its details, including the release date in UTC.

## Contributing

- Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix: `git checkout -b feature-name`
4. Make your changes and commit them: `git commit -m "Description of your changes"`
5. Push your changes to your forked repository: `git push origin feature-name`
6. Create a pull request from your forked repository to the original repository on GitHub.