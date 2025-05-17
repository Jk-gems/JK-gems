// --- Product Data (Easier to add/remove/edit products here) ---
// IMPORTANT: Update this array with your actual product information
const productsData = [
    // Gemstones Category (category: 'gemstones')
    {
        id: 'gemstone_ex1',
        name: 'Example Gemstone 1',
        price: 5500,
        description: 'Brief description of Example Gemstone 1.',
        imageUrl: 'path/to/your_gemstone_image_1.jpg', // REMEMBER TO REPLACE
        category: 'gemstones',
        whatsappMessage: "Hello, I'm interested in Example Gemstone 1. Could you provide more details and pricing?"
    },
    {
        id: 'gemstone_rings_main',
        name: 'Gemstone Rings',
        price: 999,
        description: 'Beautiful rings featuring authentic gemstones for style and astrological benefits.',
        imageUrl: 'IMG-20250516-WA0011.jpg', // REMEMBER TO REPLACE
        category: 'gemstones',
        whatsappMessage: "Hello, I'm interested in Gemstone Rings. Could you provide more details and pricing?"
    },
     // Add more Gemstone products here following the same structure...
     // Make sure each product has a unique 'id' and the correct 'category'.


    // Rudraksh Category (category: 'rudraksh')
    {
        id: 'rudraksh_mala_main',
        name: 'Rudraksh Mala',
        price: 599,
        description: 'Genuine Rudraksha beads for spiritual connection and well-being.',
        imageUrl: 'IMG-20250516-WA0003.jpg', // REMEMBER TO REPLACE
        category: 'rudraksh',
        whatsappMessage: "Hello, I'm interested in Rudraksh Mala. Could you provide more details and pricing?"
    },
    {
        id: 'rudraksh_bracelet_main',
        name: 'Rudraksh Bracelet',
        price: 5999,
        description: 'Wear the spiritual energy with authentic Rudraksh bracelets.',
        imageUrl: 'IMG-20250516-WA0016.jpg', // REMEMBER TO REPLACE
        category: 'rudraksh',
        whatsappMessage: "Hello, I'm interested in Rudraksh Bracelet. Could you provide more details and pricing?"
    },
     // Add more Rudraksh products here following the same structure...


    // Yantra & Spiritual Items Category (category: 'yantra')
     {
        id: 'yantra_main',
        name: 'Yantra',
        price: 999,
        description: 'Sacred geometric diagrams for meditation and energy focusing.',
        imageUrl: 'IMG-20250516-WA0001.jpg', // REMEMBER TO REPLACE
        category: 'yantra',
        whatsappMessage: "Hello, I'm interested in Yantra. Could you provide more details and pricing?"
    },
     {
        id: 'sphatik_yantra_main',
        name: 'Sphatik Shree Yantra',
        price: 999,
        description: 'Clear quartz Shree Yantra for purity, prosperity, and positive energy.',
        imageUrl: '61Fg6DsA4iL._AC_UF894,1000_QL80_.jpg', // REMEMBER TO REPLACE
        category: 'yantra',
        whatsappMessage: "Hello, I'm interested in Sphatik Shree Yantra. Could you provide more details and pricing?"
    },
     // Add more Yantra/Spiritual products here...
];


// Function to generate and display products for a specific category
// Explicitly attach to window for guaranteed global access
window.showProductContainer = function(category, targetGridId) {
     console.log("Attempting to show product container for category:", category); // Debug log

     // Get necessary elements from the DOM
     const containerId = category + '-products-container';
     const headingId = category + '-products-heading';

     const containerToShow = document.getElementById(containerId);
     const gridToShow = document.getElementById(targetGridId);
     const headingToShow = document.getElementById(headingId);


     console.log("Looking for container with ID:", containerId); // Debug log
     console.log("Looking for grid with ID:", targetGridId); // Debug log
     console.log("Looking for heading with ID:", headingId); // Debug log


     if (!containerToShow || !gridToShow || !headingToShow) {
         console.error("Product container, grid, or heading not found for category:", category);
         // Call showCategoryGrid from the main script (assuming it's globally accessible)
         if (typeof showCategoryGrid === 'function') {
             showCategoryGrid(); // Fallback to category grid
         } else {
             console.error("showCategoryGrid function not found!");
         }
         return;
     }

     // Capitalize first letter for heading
     const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
     headingToShow.textContent = `${categoryName} Collection`; // Update heading


     // Hide all product containers before showing the selected one
      const productContainers = document.querySelectorAll('.category-products-container');
      productContainers.forEach(container => {
          container.style.display = 'none';
           // Clear product grids when hiding their containers
           const productGrid = container.querySelector('.category-products-grid');
           if(productGrid) {
               productGrid.innerHTML = '';
           }
      });


     // --- Dynamic Product Rendering ---
     gridToShow.innerHTML = ''; // Clear existing products
     const filteredProducts = productsData.filter(product => product.category === category);

     if (filteredProducts.length === 0) {
         gridToShow.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No products found in this category.</p>';
     } else {
         filteredProducts.forEach(product => {
              // Create the WhatsApp link with encoded message
              const whatsappLink = `https://wa.me/919723197899?text=${encodeURIComponent(product.whatsappMessage)}`;

             const productHtml = `
                 <div class="product">
                     <img src="${product.imageUrl}" alt="${product.name}">
                     <div class="product-info">
                         <h3>${product.name}</h3>
                         <p class="product-description">${product.description}</p>
                         <p class="product-price">₹${product.price.toFixed(2)}</p>
                         <button class="add-to-cart-button"
                                 data-product-id="${product.id}"
                                 data-product-name="${product.name}"
                                 data-product-price="${product.price}"> Add to Cart
                         </button>
                         <a href="${whatsappLink}" class="whatsapp-button" target="_blank" aria-label="Inquire about ${product.name} on WhatsApp">
                             <i class="fab fa-whatsapp"></i> Inquire Now
                         </a>
                     </div>
                 </div>
             `;
             gridToShow.innerHTML += productHtml; // Append product HTML
         });
     }


     containerToShow.style.display = 'block'; // Show the selected product container (use 'block' for container wrapper)
     console.log("Set display to 'block' for container:", containerToShow); // Debug log


     // Assuming searchInput is globally accessible or passed
     const searchInput = document.getElementById('searchInput');
     if (searchInput) {
          searchInput.placeholder = `Search ${categoryName} products...`; // Update search placeholder
          // Note: The onkeyup handler for the search input is updated in index.html
          // when the category is selected to point to searchProductsInCategory.
          // Also, update the searchItems global reference here as it's used by the main script
          searchItems = window.searchProductsInCategory; // Update the global reference
          searchInput.onkeyup = window.searchProductsInCategory; // Attach the correct search function
          searchInput.value = ''; // Clear search input
          window.searchProductsInCategory(); // Apply search filter (will show all products initially)

     } else {
         console.warn("searchInput not found in products.js");
     }


     // Smooth scroll to the top of the products section (assuming #products exists and is accessible)
      const productsSection = document.getElementById('products');
      if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
          console.warn("#products section not found for scrolling.");
      }
     // Delegation for image modal clicks is set up in index.html and works on newly added elements
};


// Function to search only products within the currently visible category container
// This is also moved here as it operates on the dynamically generated products.
// Explicitly attach to window for guaranteed global access
window.searchProductsInCategory = function() {
    const input = document.getElementById('searchInput'); // Assuming searchInput is accessible
    const filter = input.value.toUpperCase();
    // Get the currently visible category products grid
    // Need to find the one that is currently visible by checking its parent container
    const visibleProductContainer = document.querySelector('.category-products-container[style*="display: block"]');
    const visibleProductGrid = visibleProductContainer ? visibleProductContainer.querySelector('.category-products-grid') : null;


    if (!visibleProductGrid) {
         console.warn("No visible product grid found for search.");
         return; // Should not happen if views are managed correctly
    }

    const products = visibleProductGrid.querySelectorAll('.product'); // Get products within the visible grid

    products.forEach(productElement => {
         // Search text in heading, description, and price
         const h3 = productElement.querySelector('h3');
         const description = productElement.querySelector('.product-description');
         const priceElement = productElement.querySelector('.product-price'); // Include price in search
         const textValue = (h3 ? h3.textContent || h3.innerText : '') + ' ' +
                           (description ? description.textContent || description.innerText : '') + ' ' +
                           (priceElement ? priceElement.textContent || priceElement.innerText : '');


        if (textValue.toUpperCase().indexOf(filter) > -1) {
            productElement.style.display = ""; // Show
        } else {
            productElement.style.display = "none"; // Hide
        }
    });
};

// Note: The addToCart, removeFromCart, renderCart, etc., functions are still
// in the main script in index.html. They will interact with the cart array
// and UI elements in index.html. The main script will call addToCart,
// passing the product object it finds from the productsData array.
