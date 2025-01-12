const productGrid = document.getElementById('product-grid')

axios
	.get('http://localhost:3000/items')
	.then(response => {
		const data = response.data

		data.forEach(item => {
			const productCard = document.createElement('div')
			productCard.className =
				'bg-white rounded-lg shadow p-4 flex flex-col items-center'

			productCard.innerHTML = `
                <picture class="w-full h-48">
                    <source media="(min-width: 1024px)" srcset="${
											item.image.desktop
										}">
                    <source media="(min-width: 768px)" srcset="${
											item.image.tablet
										}">
                    <source media="(max-width: 767px)" srcset="${
											item.image.mobile
										}">
                    <img src="${item.image.thumbnail}" alt="${
				item.name
			}" class="w-full h-full object-cover rounded-lg">
                </picture>
                <div class="text-center mt-4">
                    <p class="text-sm text-gray-500">${
											item.category
										}</p>
                    <h2 class="text-lg font-bold">${item.name}</h2>
                    <p class="text-xl font-semibold text-red-600 mt-2">$${item.price.toFixed(
											2,
										)}</p>
                </div>
                <button class="mt-4 bg-orange-500 text-white flex items-center px-4 py-2 rounded hover:bg-orange-600">
                    <span class="material-icons mr-2">add_shopping_cart</span>Add to Cart
                </button>
            `

			productGrid.appendChild(productCard)
		})
	})
	.catch(error => {
		console.error('Error fetching the product data:', error)
		productGrid.innerHTML = `<p class="text-center text-red-500">Failed to load products. Please try again later.</p>`
	})
