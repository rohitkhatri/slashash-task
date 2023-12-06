# Movie DB

Page 1
- Create a page to input search string from the user. On submit, fetch
- List of movies from SEARCH endpoint of above API.
- List all the results with an option to FAVORITE a movie/show for each result.
- Title, year, type along with Poster image should be shown for each result.
- Clicking favourite should save that result's information in the DB.

Page 2
- Create another page to view all the saved favorites from the DB.
- OMDB API should not be called from this page.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install
```

#### NOTE: Configure .env before starting the server

## Start Server

```bash
npm start
```

## Routes
```
/movies/search - Movie search page
/movies/favorites - Favorite movies page
```

## Demo
https://slashashtask.onrender.com/movies/search
https://slashashtask.onrender.com/movies/favorites