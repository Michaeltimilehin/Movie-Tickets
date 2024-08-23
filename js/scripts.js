// JavaScript for Movie Tickets Website

// Search Module
const SearchModule = {
  init: function() {
    this.searchButton = document.querySelector('.search-bar button');
    this.searchInput = document.querySelector('.search-bar input');
    this.movieCards = document.querySelectorAll('.movie-card');
    this.bindEvents();
  },
  bindEvents: function() {
    this.searchButton.addEventListener('click', this.handleSearch.bind(this));
  },
  handleSearch: function() {
    const query = this.searchInput.value.toLowerCase();
    let found = false;

    this.movieCards.forEach(card => {
      const title = card.querySelector('h3').innerText.toLowerCase();
      const genre = card.querySelector('p').innerText.toLowerCase();

      if (title.includes(query) || genre.includes(query)) {
        card.style.display = 'block';
        found = true;
      } else {
        card.style.display = 'none';
      }
    });

    if (!found) {
      alert('No movies or theaters found.');
    }
  }
};

// Smooth Scroll Module
const SmoothScrollModule = {
  init: function() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.bindEvents();
  },
  bindEvents: function() {
    this.links.forEach(link => {
      link.addEventListener('click', this.smoothScroll.bind(this));
    });
  },
  smoothScroll: function(e) {
    e.preventDefault();
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({
     
    });
  }
};

// FAQ Module
const FAQModule = {
  init: function() {
    this.faqItems = document.querySelectorAll('.faq-item h3');
    this.bindEvents();
  },
  bindEvents: function() {
    this.faqItems.forEach(item => {
      item.addEventListener('click', this.toggleFAQ.bind(this, item));
    });
  },
  toggleFAQ: function(item) {
    item.nextElementSibling.classList.toggle('active');
  }
};

// Initialize Modules
document.addEventListener('DOMContentLoaded', function() {
  SearchModule.init();
  SmoothScrollModule.init();
  FAQModule.init();
});

// JavaScript for handling the booking process

// Movie class representing each movie
class Movie {
  constructor(title, price, showtimes) {
      this.title = title;
      this.price = price;
      this.showtimes = showtimes;
  }
}

// MovieTicket class for handling ticket booking
class MovieTicket {
  constructor(movie, seatNumber, showtime) {
      this.movie = movie;
      this.seatNumber = seatNumber;
      this.showtime = showtime;
  }

  // Method to display the ticket
  displayTicket() {
      return `
          <p><strong>Movie:</strong> ${this.movie.title}</p>
          <p><strong>Seat:</strong> ${this.seatNumber}</p>
          <p><strong>Showtime:</strong> ${this.showtime}</p>
          <p><strong>Price:</strong> $${this.movie.price}</p>
      `;
  }

  // Method to clear the ticket details from the display
  deleteTicket() {
      return '';
  }
}

// Array of movies
const movies = [
  new Movie('Alien', 5000, ['12:00 PM', '3:00 PM', '6:00 PM']),
  new Movie('Madame Web', 5000, ['1:00 PM', '4:00 PM', '7:00 PM']),
  new Movie('The Challengers', 5000, ['11:00 AM', '2:00 PM', '5:00 PM']),
  new Movie('Despicable Me 4',   5000, ['10:00 AM', '1:00 PM', '4:00 PM']),
  new Movie('Fly me to the moon',   5000, ['12:00 AM', '3:00 PM', '6:00 PM']),
  new Movie('The Union',   5000, ['10:00 AM', '1:00 PM', '4:00 PM']),
  new Movie('Trap',   5000, ['10:00 AM', '2:00 PM', '6:00 PM']),
  new Movie('Damsel',   5000, ['9:00 AM', '1:30 PM', '5:00 PM']),
];

// DOM elements
const movieSelect = document.getElementById('movieSelect');
const showtimeSelect = document.getElementById('showtimeSelect');
const seatNumberInput = document.getElementById('seatNumber');
const bookTicketButton = document.getElementById('book-ticket');
const deleteTicketButton = document.getElementById('delete-ticket');
const ticketDetailsContainer = document.getElementById('ticket-details');

let currentTicket = null; // Variable to hold the current ticket object

// Populate the movie dropdown
movies.forEach((movie, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.textContent = `${movie.title} - N${movie.price}`;
  movieSelect.appendChild(option);
});

// Update showtimes based on selected movie
movieSelect.addEventListener('change', function () {
  const selectedMovieIndex = movieSelect.value;
  const selectedMovie = movies[selectedMovieIndex];

  // Clear the existing showtimes
  showtimeSelect.innerHTML = '';

  // Populate the showtime dropdown
  selectedMovie.showtimes.forEach((showtime) => {
      const option = document.createElement('option');
      option.value = showtime;
      option.textContent = showtime;
      showtimeSelect.appendChild(option);
  });
});

// Automatically trigger the change event to populate showtimes on page load
movieSelect.dispatchEvent(new Event('change'));

// Event listener for booking the ticket
bookTicketButton.addEventListener('click', function () {
  const selectedMovieIndex = movieSelect.value;
  const selectedMovie = movies[selectedMovieIndex];
  const seatNumber = seatNumberInput.value.trim();
  const showtime = showtimeSelect.value;

  if (selectedMovie && seatNumber && showtime) {
      // Create a new MovieTicket object
      currentTicket = new MovieTicket(selectedMovie, seatNumber, showtime);

      // Display the ticket
      ticketDetailsContainer.innerHTML = currentTicket.displayTicket();

      // Show the delete button
      deleteTicketButton.style.display = 'inline-block';

      // Clear the form inputs
      seatNumberInput.value = '';
  } else {
      alert('Please fill in all fields.');
  }
});

// Event listener for deleting the ticket
deleteTicketButton.addEventListener('click', function () {
  if (currentTicket) {
      // Clear the ticket details display
      ticketDetailsContainer.innerHTML = currentTicket.deleteTicket();

      // Hide the delete button
      deleteTicketButton.style.display = 'none';

      // Clear the current ticket object
      currentTicket = null;
  }
});
