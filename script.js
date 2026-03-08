// To-Do
const api_key = "6736a8715d9df12d01703008c28e6808";
const api_url = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key;
let currentPage = 1;
let totalPages = 1;
let currentMovies = [];

async function fetchMovies(page=1) {
    try {
        currentPage = page;
        const url = api_url + "&page=" + page;
        const response = await fetch(url);
        const data = await response.json();
        if (totalPages === 1) {
            totalPages = Math.min(data.total_pages, 48963);
        }
        const movies = data.results;
        currentMovies = movies;
        renderMovies(movies);
        const pageInfo = document.getElementById("pageInfo");
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function renderMovies(movies) {
    const moviesContainer = document.getElementById("movieList");
    moviesContainer.innerHTML = "";
    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
        `;
        moviesContainer.appendChild(movieElement);
    });
}


const prev = document.getElementById("prevBtn");
const next = document.getElementById("nextBtn");
prev.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchMovies(currentPage);
    }
});
next.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchMovies(currentPage);
    }
});

fetchMovies(currentPage);

