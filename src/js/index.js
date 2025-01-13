const productGrid = document.getElementById('product-grid')

axios
	.get('http://localhost:3000/items')
	.then(response => {
		const data = response.data

		data.forEach(item => {
			const productCard = document.createElement('div')
			productCard.className = 'rounded-lg flex flex-col items-start'

			productCard.innerHTML = `
                <picture class="w-full">
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
									  <button class="-mt-5 mx-auto bg-white text-[#260F08] text-sm font-semibold border-[1px] border-[#AD8A85]  flex items-center justify-center px-8 py-3 rounded-full hover:bg-orange-600">
      <img src="../assets/images/icon-add-to-cart.svg" alt="Add to Cart Icon" class="w-5 h-5 mr-2">
      <span class="text-sm font-medium">Add to Cart</span>
  </button>
                <div class="flex flex-col text-start mt-4 gap-2 p-4">
                    <p class="text-sm text-[#87635A]">${
											item.category
										}</p>
                    <h2 class="text-base font-semibold text-[#260F08]">${
											item.name
										}</h2>
                    <p class="text-base font-semibold text-[#C73B0F]">$${item.price.toFixed(
											2,
										)}</p>
                </div>
            `

			productGrid.appendChild(productCard)
		})
	})
	.catch(error => {
		console.error('Error fetching the product data:', error)
		productGrid.innerHTML = `<p class="text-center text-red-500">Failed to load products. Please try again later.</p>`
	})
