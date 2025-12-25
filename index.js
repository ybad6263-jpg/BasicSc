    document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Variable Definitions ---
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');

    //const nextButton = document.querySelector('.next-button');
    //const prevButton = document.querySelector('.prev-button');
    const sliderContainer = document.querySelector('.backhero'); // The main slider area

    let currentSlide = 0;
    let slideInterval;
    let dots; // Will store the dot elements after creation
    
    // Configuration
    const autoSlideDelay = 6000; // 6 seconds
    const minSwipeDistance = 50; // Minimum pixels for a recognized swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    // --- 2. Core Logic Functions ---

    // Function to show a specific slide index
    function showSlide(index) {
        // Set the validated index as the current slide
        currentSlide = index; 

        // 1. Update slides visibility (CSS transition handles the fade)
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');

        // 2. Update dots indicator
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    // Function to move to the next slide, handling array wrap
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length; 
        showSlide(nextIndex);
    }

    // Function to move to the previous slide, handling array wrap
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length; 
        showSlide(prevIndex);
    }
    
    // --- 3. Auto-Slide Control ---

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, autoSlideDelay);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // --- 4. Touch/Swipe Handling ---
    
    function handleGesture() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                prevSlide(); // Swiped right
            } else {
                nextSlide(); // Swiped left
            }
            resetAutoSlide();
        }
    }

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide(); // Pause slider while touching
    }, false);

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
        startAutoSlide(); // Resume slider after touch ends
    }, false);
    
    // --- 5. Initialization ---

    // Create navigation dots dynamically
    function createDots() {
        slides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                showSlide(index);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });
        // Important: Assign the created dots to the global 'dots' variable
        dots = document.querySelectorAll('.dot'); 
    }

    // Manual Controls (Arrows)
    //nextButton.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    //prevButton.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    // Pause on Hover/Focus (UX/Accessibility)
    /*
    [sliderContainer, nextButton, prevButton].forEach(el => {
        el.addEventListener('mouseenter', stopAutoSlide);
        el.addEventListener('mouseleave', startAutoSlide);
        el.addEventListener('focusin', stopAutoSlide);
        el.addEventListener('focusout', startAutoSlide);
    });
*/
    // Run Initial Setup
    createDots();
    showSlide(currentSlide);
    startAutoSlide();
});
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    if (menuToggle.innerHTML == "☰") 
        {
    menuToggle.innerHTML = "x";
        }
       else {
            menuToggle.innerHTML = "☰";
        }
});


//ano json
fetch('assests/data/annoucement.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load announcements');
    }
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('announcement-list');

    if (!container) return;

    // Clear in case of re-render
    container.innerHTML = '';

    // Show latest first (optional but nice)
    data.reverse().forEach(item => {
      const div = document.createElement('div');
      div.className = 'announcement-item';

      div.innerHTML = `
        <h4>${item.title}</h4>
        <small>${item.date}</small>
        <p>${item.message}</p>
      `;

      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error(error);
  });
