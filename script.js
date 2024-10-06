const carousel = document.querySelector(".carousel");
const arrowIcons = document.querySelectorAll(".wrapper-card i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

// Klik panah untuk scroll ke kiri atau kanan
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const scrollAmount = carousel.clientWidth; // Scroll seukuran container carousel
        carousel.scrollLeft += icon.id === "left" ? -scrollAmount : scrollAmount;
    });
});

// Fungsi untuk memulai drag
const dragStart = (e) => {
    isDragStart = true;
    isDragging = false; // Set ke false saat drag dimulai
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

// Fungsi untuk dragging
const dragging = (e) => {
    if (!isDragStart) return;
    isDragging = true; // Set ke true saat sedang dragging
    e.preventDefault();
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
}

// Fungsi untuk menghentikan drag
const dragStop = () => {
    isDragStart = false;

    // Jika sedang dragging, tambahkan animasi untuk inertia
    if (isDragging) {
        requestAnimationFrame(autoScroll);
    }
}

// Fungsi auto-scroll inertia saat drag dilepas
const autoScroll = () => {
    if (Math.abs(positionDiff) > 1) {
        carousel.scrollLeft -= positionDiff * 0.95; // Kurangi sedikit untuk memberikan efek inersia
        positionDiff *= 0.95; // Kurangi kecepatan secara bertahap
        requestAnimationFrame(autoScroll); // Ulangi animasi sampai kecepatan cukup kecil
    }
}

// Event listeners untuk drag dan scroll
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);

carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("touchend", dragStop);





const movies = [
    { title: "Avatar (2009)", description: "Description of Movie 1", image: "assets/avatar.jpg", rating: "★★★★☆" },
    { title: "Avengers: Endgame (2019)", description: "Description of Movie 2", image: "assets/avengers-endgame.jpg", rating: "★★★☆☆" },
    { title: "Avatar: The Way of Water (2022)", description: "Description of Movie 3", image: "assets/avatar-the-way-of-water.webp", rating: "★★★★★" },
    { title: "Titanic (1997)", description: "Description of Movie 3", image: "assets/titanic.jpg", rating: "★★★★☆" },
    { title: "Star Wars: Episode VII - The Force Awakens (2015)", description: "Description of Movie 3", image: "assets/star-wars-the-force-awakens.jpg", rating: "★★★☆☆" },
    { title: "Avengers: Infinity War (2018)", description: "Description of Movie 3", image: "assets/avengers-infinity-war.jpg", rating: "★★★★☆" },
    { title: "Spider-Man: No Way Home (2021)", description: "Description of Movie 3", image: "assets/spiderman-no-way-home.jpg", rating: "★★★★★" },
    { title: "Inside Out 2 (2024)", description: "Description of Movie 3", image: "assets/inside-out-2.jpg", rating: "★★★★★" },
    { title: "Jurassic World (2015)", description: "Description of Movie 3", image: "assets/jurassic-world.jpg", rating: "★★☆☆☆" },
    { title: "The Lion King (2019)", description: "Description of Movie 3", image: "assets/the-lion-king.jpg", rating: "★★★★☆" },
];

const movieList = document.getElementById('movie-list');

movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'col-12 col-sm-6 col-md-4 mb-4';
    card.innerHTML = `
        <div class="card h-100">
            <img src="${movie.image}" class="card-img-top img-fluid" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="rating">${movie.rating}</p>
                <p class="card-text">${movie.description}</p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookingModal" onclick="openBookingModal('${movie.title}')">Book Ticket</button>
            </div>
        </div>
    `;
    movieList.appendChild(card);
});

function openBookingModal(movieTitle) {
    document.getElementById('movieTitle').value = movieTitle;
}

function bookTicket() {
    const movieName = document.getElementById('movieTitle').value;
    const name = document.getElementById('name').value;
    const seatsValue = document.getElementById('seats').value;

    const message = `Booking ${movieName} for ${seatsValue} seats by ${name}`;
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
    modal.hide();

    alert(message);

    document.getElementById('name').value = '';
    document.getElementById('seats').value = '';
}

///////
document.addEventListener('DOMContentLoaded', function() {
    // Ambil semua elemen slide dan navigasi
    const slides = document.querySelectorAll('.cd-hero-slider li');
    const sliderNav = document.querySelectorAll('.cd-slider-nav ul li');
    
    // Array untuk gambar latar belakang yang berbeda
    const backgroundImages = [
        'url("./path/slide.png")',  // Background untuk slide pertama
        'url("./path/slide2.png")',  // Background untuk slide kedua
        'url("./path/slide3.png")',   // Background untuk slide ketiga
        'url("./path/slide1.png")',   // Background untuk slide ketiga
        'url("./path/slide3.png")',   // Background untuk slide ketiga

    ];
    
    let currentSlide = 0;
    
    // Fungsi untuk mengganti slide
    function changeSlide(index) {
        // Hapus kelas 'selected' dari slide dan navigasi yang aktif
        slides[currentSlide].classList.remove('selected');
        sliderNav[currentSlide].classList.remove('selected');
        
        // Tambahkan kelas 'selected' ke slide dan navigasi baru
        slides[index].classList.add('selected');
        sliderNav[index].classList.add('selected');
        
        // Ubah background sesuai dengan slide yang aktif
        document.querySelector('.cd-full-width').style.backgroundImage = backgroundImages[index];
        
        currentSlide = index;
    }
    
    // Ketika navigasi diklik, ganti slide sesuai indeks
    sliderNav.forEach((navItem, index) => {
        navItem.addEventListener('click', function() {
            changeSlide(index);
        });
    });

    // Autoplay slide setiap 5 detik
    setInterval(function() {
        let nextSlide = (currentSlide + 1) % slides.length;
        changeSlide(nextSlide);
    }, 5000);
});
