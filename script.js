document.addEventListener('DOMContentLoaded', function() {






    //Menu dark/light effect
    document.addEventListener('scroll', function() {
        const navbar = document.getElementById('nav-bar');
        const sections = document.querySelectorAll('.section');
        let isDarkBackground = false;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 0 && rect.bottom >= 0) {
                if (section.classList.contains('dark-background')) {
                    isDarkBackground = true;
                } else if (section.classList.contains('light-background')) {
                    isDarkBackground = false;
                }
            }
        });

        if (isDarkBackground) {
            navbar.style.color = '#f0f0f0';
            navbar.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.7)'; // Apply text-shadow for dark background
            navbar.querySelectorAll('a').forEach(a => {
                a.style.color = '#f0f0f0';
                a.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.7)'; // Apply text-shadow to links
            });
        } else {
            navbar.style.color = 'black';
            navbar.style.textShadow = 'none'; // Remove text-shadow for light background
            navbar.querySelectorAll('a').forEach(a => {
                a.style.color = 'black';
                a.style.textShadow = 'none'; // Remove text-shadow from links
            });
        }
    });

    // Toggle circle Menu
    const menuButton = document.getElementById('nav-menu');
    const closeButton = document.getElementById('close-menu');
    const circleMenu = document.getElementById('circle-menu');

    // Function to toggle the menu
    function toggleMenu() {
        document.body.classList.toggle('menu-open');
    }

    // Open or close the menu when clicking the menu button
    menuButton.addEventListener('click', function() {
        toggleMenu();
    });

    // Close the menu when clicking the close button
    closeButton.addEventListener('click', function(){
        toggleMenu();
    });



    // Alert will come online later
    // Select all menu links
    const notOnline = document.querySelectorAll('.not-online-yet');


    // Add click event listener to each link
    notOnline.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            alert("This link does not work yet - will come online later!");
        });
    });

});


document.addEventListener('DOMContentLoaded', function() {

const scrollSection = document.querySelector('.home-gallery');
const testScroll = document.querySelectorAll('.test-scroll')

if (scrollSection) {
    
    scrollSection.addEventListener('scroll', function() {
        alert("You've just entered scroll section");
        const scrollPosition = scrollSection.scrollTop;
        const sectionHeight = scrollSection.scrollHeight - scrollSection.clientHeight
        const scrollPercentage = scrollPosition / sectionHeight;
    });
}
else {
    console.error('Scroll section not found')
}

});

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-kijkje');

    const updateGalleryItemStyle = (entry) => {
        const viewportHeight = window.innerHeight;
        const itemRect = entry.target.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;

        // Calculate how close the item is to the center of the viewport
        const distanceFromCenter = Math.abs(viewportHeight / 2 - itemCenterY);
        const maxDistance = viewportHeight / 2; // Maximum distance from the center

        // Calculate opacity and scale based on distance from center
        const opacity = 1 - Math.min(distanceFromCenter / maxDistance, 0.7);
        const scale = 1 + (1 - Math.min(distanceFromCenter / maxDistance, 1)) * 0.07;

        // Apply styles
        entry.target.style.opacity = opacity;
        entry.target.style.transform = `scale(${scale})`;
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateGalleryItemStyle(entry);
            } else {
                entry.target.style.opacity = 0.3;
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, { threshold: [0, 0.5, 1] });

    galleryItems.forEach(item => {
        observer.observe(item);
    });

    // Update the styles during scroll for active images
    window.addEventListener('scroll', () => {
        galleryItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            if (itemRect.top < window.innerHeight && itemRect.bottom > 0) {
                updateGalleryItemStyle({ target: item });
            }
        });
    });
});

    

/*

const scrollSection = document.querySelector('.home-gallery');

if (scrollSection) {
    scrollSection.addEventListener('scroll', function() {
        const scrollPosition = scrollSection.scrollTop;
        const sectionHeight = scrollSection.scrollHeight - scrollSection.clientHeight;
        const scrollPercentage = scrollPosition / sectionHeight;

  // Calculate color based on scroll percentage
        const red = Math.floor(255 - scrollPercentage * 25);  // 255 to 230
        const green = Math.floor(250 - scrollPercentage * 20); // 250 to 230
        const blue = Math.floor(240 + scrollPercentage * 5);  // 240 to 245

        scrollSection.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    });
} else {
    console.error('Scroll section not found');
}

*/

