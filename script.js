document.addEventListener('DOMContentLoaded', function() {

    //Fade effects
    const fadeContents = document.querySelectorAll('.fade-content');
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

    // Create the Intersection Observer for fade effects
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeContents.forEach(content => {
        observer.observe(content);
    });




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


});
