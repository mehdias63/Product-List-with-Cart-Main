document.addEventListener('DOMContentLoaded', () => {
	const productGrid = document.getElementById('product-grid')
	const cartItems = document.getElementById('cart-items')
	const cartTotal = document.getElementById('cart-total')
	const cartCount = document.getElementById('cart-count')
	const confirmOrderButton = document.getElementById('confirm-order')
	const orderModal = document.getElementById('order-modal')
	const modalCartItems = document.getElementById('modal-cart-items')
	const modalCartTotal = document.getElementById('modal-cart-total')
	const closeModalButton = document.getElementById('close-modal')
	const startNewOrderButton =
		document.getElementById('start-new-order')

	let cart = {}

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
									  <button class="add-to-cart -mt-5 mx-auto bg-white text-rose-900 text-sm font-semibold border-[1px] border-rose-400  flex items-center justify-center px-8 py-3 rounded-full hover:bg-rose-300">
      <img src="../assets/images/icon-add-to-cart.svg" alt="Add to Cart Icon" class="w-5 h-5 mr-2">
      <span class="text-sm font-medium">Add to Cart</span>
  </button>
                <div class="flex flex-col text-start mt-4 gap-2 p-4">
                    <p class="text-sm text-rose-500">${
											item.category
										}</p>
                    <h2 class="text-base font-semibold text-rose-900">${
											item.name
										}</h2>
                    <p class="text-base font-semibold text-red">$${item.price.toFixed(
											2,
										)}</p>
                </div>
            `

				productGrid.appendChild(productCard)
				const button = productCard.querySelector('.add-to-cart')
				let count = 0

				button.addEventListener('click', () => {
					if (!button.classList.contains('counter-active')) {
						button.classList.add('counter-active')
						button.innerHTML = `
                            <div class="flex items-center space-x-2">
                                <button class="decrement bg-gray-300 text-gray-700 px-2 py-1 rounded">-</button>
                                <span class="count text-lg font-semibold">1</span>
                                <button class="increment bg-gray-300 text-gray-700 px-2 py-1 rounded">+</button>
                            </div>
                        `

						const decrementButton = button.querySelector('.decrement')
						const incrementButton = button.querySelector('.increment')
						const countElement = button.querySelector('.count')

						count = 1

						const updateCart = () => {
							if (count === 0) {
								delete cart[item.name]
							} else {
								cart[item.name] = {
									name: item.name,
									price: item.price,
									count: count,
									button: button,
									image: item.image.thumbnail,
								}
							}
							renderCart()
						}

						decrementButton.addEventListener('click', () => {
							if (count > 1) {
								count--
								countElement.textContent = count
								updateCart()
							}
						})

						incrementButton.addEventListener('click', () => {
							count++
							countElement.textContent = count
							updateCart()
						})

						updateCart()
					}
				})
			})
		})
		.catch(error => {
			console.error('Error fetching the product data:', error)
			productGrid.innerHTML = `<p class="text-center text-red-500">Failed to load products. Please try again later.</p>`
		})

	const renderCart = () => {
		cartItems.innerHTML = ''
		modalCartItems.innerHTML = ''
		let total = 0
		let totalItems = 0

		Object.values(cart).forEach(product => {
			// Add to cart section
			const cartItem = document.createElement('div')
			cartItem.className =
				'flex justify-between items-center border-b pb-2'

			cartItem.innerHTML = `
                <div>
                    <h3 class="font-semibold">${product.name}</h3>
                    <p class="text-sm text-gray-500">$${product.price.toFixed(
											2,
										)} x ${product.count}</p>
                </div>
                <div class="flex items-center">
                    <p class="font-bold">$${(
											product.price * product.count
										).toFixed(2)}</p>
                    <button class="delete-item text-red-600 hover:text-red-800">
                        <img src="../assets/images/icon-remove-item.svg" alt="Remove" class="w-5 h-5">
                    </button>
                </div>
            `
			cartItems.appendChild(cartItem)
			cartCount.textContent = `(${totalItems})`

			// Always call resetButtons to ensure buttons reflect the updated cart
			resetButtons()
		})
	}
	const resetButtons = () => {
		// Reset all buttons to "Add to Cart" state
		document.querySelectorAll('.add-to-cart').forEach(button => {
			button.classList.remove('counter-active')
			button.innerHTML = `
            <img src="../assets/images/icon-add-to-cart.svg" alt="Add to Cart Icon" class="w-5 h-5 mr-2">
            Add to Cart
        `
		})

		// Update buttons for products currently in the cart
		Object.values(cart).forEach(product => {
			if (product.button) {
				const button = product.button

				button.classList.add('counter-active')
				button.innerHTML = `
                <div class="flex items-center space-x-2">
                    <button class="decrement bg-gray-300 text-gray-700 px-2 py-1 rounded">-</button>
                    <span class="count text-lg font-semibold">${product.count}</span>
                    <button class="increment bg-gray-300 text-gray-700 px-2 py-1 rounded">+</button>
                </div>
            `

				// Add event listeners for the decrement and increment buttons
				const decrementButton = button.querySelector('.decrement')
				const incrementButton = button.querySelector('.increment')
				const countElement = button.querySelector('.count')

				decrementButton.addEventListener('click', () => {
					if (product.count > 1) {
						product.count--
						countElement.textContent = product.count
					}
					renderCart()
				})

				incrementButton.addEventListener('click', () => {
					product.count++
					countElement.textContent = product.count
					renderCart()
				})
			}
		})
	}

	confirmOrderButton.addEventListener('click', () => {
		orderModal.classList.remove('hidden')
	})

	closeModalButton.addEventListener('click', () => {
		orderModal.classList.add('hidden')
	})

	startNewOrderButton.addEventListener('click', () => {
		cart = {}
		resetButtons() // Reset buttons when starting a new order
		renderCart()
		orderModal.classList.add('hidden')
	})
})
