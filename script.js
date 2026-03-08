// To-Do
const api_key = "6736a8715d9df12d01703008c28e6808";
const api_url = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key;
let currentPage = 1;
let totalPages = 1;


async function fetchMovies(page = 1) {
    try {
        const url = api_url + "&page=" + page;
        const response = await fetch(url);
        const data = await response.json();
        totalPages = data.total_pages;
        console.log("Current page:", data.page);
        console.log("Total pages:", data.total_pages);
        const movies = data.results;
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
        const pageInfo = document.getElementById("pageInfo");
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}
fetchMovies(currentPage);

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