// To-Do
const api_key = "6736a8715d9df12d01703008c28e6808";
const api_url = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key;
let currentPage = 1;
let totalPages = 1;
let currentMovies = [];
let searchQuery = "";

async function fetchMovies(page=1) {
    try {
        let data;
        currentPage = page;
        if (searchQuery) {
            const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(searchQuery)}&page=${page}`;
            const searchResponse = await fetch(searchUrl);
            data = await searchResponse.json();
        } else {
            const url = api_url + "&page=" + page;
            const response = await fetch(url);
            data = await response.json();
        }
        totalPages = Math.min(data.total_pages, 48963);
        currentMovies = data.results;
        const sortedMovies = sortMovies(currentMovies);
        renderMovies(sortedMovies);
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

const searchInput = document.getElementById("searchMovie");
searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value.trim();
    currentPage = 1;
    fetchMovies(currentPage);
});

const sortSelect = document.getElementById("sortMovies");
sortSelect.addEventListener("change", () => {
    const sortedMovies = sortMovies(currentMovies);
    renderMovies(sortedMovies);
});

function sortMovies(movies) {
    const sorted = [...movies];
    if (sortSelect.value === "releaseAsc") {
        sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    } else if (sortSelect.value === "releaseDesc") {
        sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortSelect.value === "ratingAsc") {
        sorted.sort((a, b) => a.vote_average - b.vote_average);
    } else if (sortSelect.value === "ratingDesc") {
        sorted.sort((a, b) => b.vote_average - a.vote_average);
    }
    return sorted;
}

fetchMovies(currentPage);

