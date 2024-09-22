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
    const menuLinks = document.querySelectorAll('#circle-menu a'); // Select all links in the menu

    // Function to toggle the menu
    function toggleMenu() {
        document.body.classList.toggle('menu-open');
    }

    // Open the menu when clicking the menu button
    menuButton.addEventListener('click', function() {
        document.body.classList.add('menu-open'); // Ensure the menu opens
    });

    // Close the menu when clicking the close button
    closeButton.addEventListener('click', function() {
        document.body.classList.remove('menu-open'); // Ensure the menu closes
    });

    // Close the menu after clicking any menu link and navigate to the section
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.body.classList.remove('menu-open'); // Close the menu
        });
    });


});

    // Update the gallery images dynamically

    const photosPerPage = 4;
    let currentPage = 1;
    let photos = []; // Will hold the data fetched from photos.json

    // Function to fetch photo data from JSON file
    function fetchPhotoData() {
        fetch('photos.json')
            .then(response => response.json())
            .then(data => {
                photos = data;
                updateGallery();
            })
            .catch(error => console.error('Error fetching photo data:', error));
    }

    // Update the gallery, first text box
    function updateTextBox(photo) {
        const textBoxHeader = document.querySelector('.gallery-textbox-header');
        const textBoxDescription = document.querySelector('.gallery-textbox-text');
        const textBoxDate = document.querySelector('.gallery-textbox-date');

        // Remove the animation class to reset it
        textBoxHeader.classList.remove('text-fade-in');
        textBoxDescription.classList.remove('text-fade-in');
        textBoxDate.classList.remove('text-fade-in');

        textBoxHeader.textContent = photo.title;
        textBoxDescription.textContent = photo.description;
        textBoxDate.textContent = photo.date;

        // Trigger reflow to restart the animation
        void textBoxHeader.offsetWidth;

        // Add the animation class to trigger the animation
        textBoxHeader.classList.add('text-fade-in');
        textBoxDescription.classList.add('text-fade-in');
        textBoxDate.classList.add('text-fade-in');
    }


    // Update the selected photo and text on click
    function addImageClickListeners() {
        const galleryImages = document.querySelectorAll('.gallery-picture img');

        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                // Remove 'selected' class from all images
                galleryImages.forEach(img => img.classList.remove('selected'));

                // Add 'selected' class to the clicked image
                image.classList.add('selected');

                // Get data attributes
                const photoData = {
                    title: image.dataset.title,
                    description: image.dataset.description,
                    date: image.dataset.date
                };

                // Update text box content
                updateTextBox(photoData);
            });
        });
    }

    // update the photo's in the gallery using navigation
    function updateGallery() {
    const startIndex = (currentPage - 1) * photosPerPage;
    const endIndex = startIndex + photosPerPage;
    const currentPhotos = photos.slice(startIndex, endIndex);
    const galleryImageElements = document.querySelectorAll('.gallery-picture img');
    
    // Remove 'selected' class from all images
    galleryImageElements.forEach(img => img.classList.remove('selected'));

    // Fade out images
    galleryImageElements.forEach(imgElement => {
        imgElement.classList.add('hidden');
    });

    // Wait for the fade-out transition to complete
    setTimeout(() => {
        
        // Update images
        galleryImageElements.forEach((imgElement, index) => {
            const photo = currentPhotos[index];
            if (photo) {
                imgElement.src = photo.image;
                imgElement.alt = photo.title;
                imgElement.dataset.title = photo.title;
                imgElement.dataset.description = photo.description;
                imgElement.dataset.date = photo.date;

                imgElement.parentElement.style.display = 'block';

                // Remove 'hidden' to fade in
                imgElement.classList.remove('hidden');
            } else {
                imgElement.parentElement.style.display = 'none';
            }
        });

        // Update the text box after images have started fading in
        const firstPhoto = currentPhotos[0];
        if (firstPhoto) {
            updateTextBox(firstPhoto);

            // Delay adding 'selected' class to the first image until after fade-in
            setTimeout(() => {
                galleryImageElements[0].classList.add('selected');
            }, 1000); // Match fade-in duration
        }

        // Re-attach click event listeners to the images
        addImageClickListeners();

        // Update navigation buttons
        updateNavigationButtons();
    }, 1000); // Wait for fade-out to complete (match the CSS transition duration)
}

    
     
    function updateNavigationButtons() {
        const totalPages = Math.ceil(photos.length / photosPerPage);
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');

        // Disable Prev button on the first page
        if (currentPage === 1) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }

        // Disable Next button on the last page
        if (currentPage >= totalPages) {
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
        }
    }

    // Event listeners for navigation buttons
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updateGallery();
        }
    });

    nextButton.addEventListener('click', function() {
        const totalPages = Math.ceil(photos.length / photosPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updateGallery();
        }
    });

    // Fetch photo data and initialize the gallery
    fetchPhotoData();



// Scale the picture to entire gallery

    const galleryImages = document.querySelectorAll('.gallery-picture');
    const photoGallery = document.querySelector('.photo-gallery');

    galleryImages.forEach(image => {
        image.addEventListener('click', function(e) {
            e.stopPropagation();

            // Check if an overlay is already present
            if (document.querySelector('.image-overlay')) {
                return;
            }

            // Get the image element
            const imgElement = image.querySelector('img');

            // Get the position and size of the image relative to the viewport
            const rect = imgElement.getBoundingClientRect();

            // Create an overlay div
            const overlay = document.createElement('div');
            overlay.classList.add('image-overlay');
            overlay.style.position = 'fixed';
            overlay.style.top = rect.top + 'px';
            overlay.style.left = rect.left + 'px';
            overlay.style.width = rect.width + 'px';
            overlay.style.height = rect.height + 'px';
            overlay.style.backgroundImage = `url(${imgElement.src})`;
            overlay.style.backgroundSize = 'cover';
            overlay.style.backgroundPosition = 'center';
            overlay.style.zIndex = 1000;
            overlay.style.cursor = 'pointer';
            overlay.style.willChange = 'transform';
            overlay.style.transition = 'transform 1s ease';
            overlay.style.transformOrigin = 'center center';

            // Append the overlay to the body
            document.body.appendChild(overlay);

            // Disable scrolling and compensate for scrollbar disappearance
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.classList.add('no-scroll');
            document.body.style.paddingRight = scrollbarWidth + 'px';

            // Force a reflow
            overlay.offsetHeight;

            // Calculate the target position and scale
            // Get the bounding rect of the left 2x2 grid area
            const leftGridItems = document.querySelectorAll('.gallery-picture');

            // Initialize variables to determine the combined bounding rectangle
            let leftGridRect = {
                top: Infinity,
                left: Infinity,
                right: -Infinity,
                bottom: -Infinity
            };

            leftGridItems.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                if (itemRect.top < leftGridRect.top) leftGridRect.top = itemRect.top;
                if (itemRect.left < leftGridRect.left) leftGridRect.left = itemRect.left;
                if (itemRect.right > leftGridRect.right) leftGridRect.right = itemRect.right;
                if (itemRect.bottom > leftGridRect.bottom) leftGridRect.bottom = itemRect.bottom;
            });

            const targetWidth = leftGridRect.right - leftGridRect.left;
            const targetHeight = leftGridRect.bottom - leftGridRect.top;
            const targetX = leftGridRect.left;
            const targetY = leftGridRect.top;

            // Calculate scale factors
            const scaleX = targetWidth / rect.width;
            const scaleY = targetHeight / rect.height;

            // Calculate translation
            const translateX = (targetX + targetWidth / 2) - (rect.left + rect.width / 2);
            const translateY = (targetY + targetHeight / 2) - (rect.top + rect.height / 2);

            // Apply transform using translate and scale
            overlay.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

            // Change background color and font color
            photoGallery.classList.add('cinematic-mode');

            // Function to close the overlay
            function closeOverlay() {
                // Remove keydown listener
                document.removeEventListener('keydown', escFunction);

                // Reverse the animation
                overlay.style.transform = 'none';

                // Remove cinematic mode
                photoGallery.classList.remove('cinematic-mode');

                // Re-enable scrolling and remove padding
                document.body.classList.remove('no-scroll');
                document.body.style.paddingRight = '';

                // After the transition ends, remove the overlay
                overlay.addEventListener('transitionend', function() {
                    overlay.remove();
                }, { once: true });
            }

            // Close the overlay when clicked
            overlay.addEventListener('click', function() {
                closeOverlay();
            });

            // Close the overlay when pressing the 'Escape' key
            function escFunction(e) {
                if (e.key === 'Escape') {
                    closeOverlay();
                }
            }
            document.addEventListener('keydown', escFunction);
        });
    });

    galleryImages.forEach(image => {

        // Add opaque class to all other images on hover
        image.addEventListener('mouseenter', function() {
            galleryImages.forEach(otherImage => {
                if (otherImage !== image) {
                    otherImage.classList.add('opaque');
                }
            });
        });
    
        // Remove opaque class from all images when hover ends
        image.addEventListener('mouseleave', function() {
            galleryImages.forEach(otherImage => {
                otherImage.classList.remove('opaque');
            });
        });
    });


    
  



   


    // NOT USED ANYMORE


        // // Click outside the images to reset
    // photoGallery.addEventListener('click', function(e) {
    //     if (!e.target.closest('.gallery-picture')) {
    //         // Remove expand class and cinematic mode
    //         document.querySelectorAll('.expand').forEach(img => {
    //             img.classList.remove('expand');
    //         });
    //         photoGallery.classList.remove('cinematic-mode');
    //     }
    // });

    
    // const galleryItems = document.querySelectorAll('.gallery-kijkje');

    // const updateGalleryItemStyle = (entry) => {
    //     const viewportHeight = window.innerHeight;
    //     const itemRect = entry.target.getBoundingClientRect();
    //     const itemCenterY = itemRect.top + itemRect.height / 2;

    //     // Calculate how close the item is to the center of the viewport
    //     const distanceFromCenter = Math.abs(viewportHeight / 2 - itemCenterY);
    //     const maxDistance = viewportHeight / 2; // Maximum distance from the center

    //     // Calculate opacity and scale based on distance from center
    //     const opacity = 1 - Math.min(distanceFromCenter / maxDistance, 0.7);
    //     const scale = 1 + (1 - Math.min(distanceFromCenter / maxDistance, 1)) * 0.07;

    //     // Apply styles
    //     entry.target.style.opacity = opacity;
    //     entry.target.style.transform = `scale(${scale})`;
    // };

    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             updateGalleryItemStyle(entry);
    //         } else {
    //             entry.target.style.opacity = 0.3;
    //             entry.target.style.transform = 'scale(1)';
    //         }
    //     });
    // }, { threshold: [0, 0.5, 1] });

    // galleryItems.forEach(item => {
    //     observer.observe(item);
    // });

    // // Update the styles during scroll for active images
    // window.addEventListener('scroll', () => {
    //     galleryItems.forEach(item => {
    //         const itemRect = item.getBoundingClientRect();
    //         if (itemRect.top < window.innerHeight && itemRect.bottom > 0) {
    //             updateGalleryItemStyle({ target: item });
    //         }
    //     });
    // });



    
    // const galleryImages = document.querySelectorAll('.gallery-picture');
    // const photoGallery = document.querySelector('.photo-gallery');
    
    // galleryImages.forEach(image => {
    //     image.addEventListener('click', function(e) {
    //         // Prevent the click event from propagating to the photoGallery's event listener
    //         e.stopPropagation();
    
    //         // Check if the clicked image already has the 'expand' class
    //         if (image.classList.contains('expand')) {
    //             // If it has the 'expand' class, remove it (i.e., close the image)
    //             image.classList.remove('expand');
    //             photoGallery.classList.remove('cinematic-mode');
    //         } else {
    //             // If it doesn't have the 'expand' class, remove expand from all other images
    //             document.querySelectorAll('.expand').forEach(img => {
    //                 img.classList.remove('expand');
    //             });
    
    //             // Add expand class to the clicked image and enable cinematic mode
    //             image.classList.add('expand');
    //             photoGallery.classList.add('cinematic-mode');
    //         }
    //     });
    // });


    
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
