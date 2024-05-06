// Show products
const showDataProducts = () => {

    const dataLocalStorage = JSON.parse(localStorage.getItem('products'))
    return dataLocalStorage !== null ? dataLocalStorage : []
}

// Add new product
const addProduct = (products, product, price, isChecked) => {

    products.push({
        id: uuid(),
        title: product,
        price: price,
        exist: isChecked
    })
    renderProducts(products)

}

// Render products
const renderProducts = (products) => {

    products !== null ?  localStorage.setItem('products', JSON.stringify(products)) : []
    document.querySelector('#show-products').innerHTML = ''
    products.forEach(item => {
        document.querySelector('#show-products').appendChild(createElementDOM(products, item))
    })

}

// Create element
const createElementDOM = (products, product) => {

    const parentEl = document.createElement('div')

    const aEl = document.createElement('a')
    aEl.setAttribute('href', `./productSingle.html#${product.id}`)

    const productEl = document.createElement('span')
    const btnEl = document.createElement("button")

    const existEl = document.createElement("input");
    existEl.setAttribute("type", "checkbox");

    existEl.addEventListener('change', e => {
        const isChecked = e.target.checked
        cheangeExist(products, product, isChecked)
    })

    btnEl.textContent = 'Delete'
    btnEl.addEventListener('click', e => {
        removeProduct(products, product)
    })

    existEl.checked = product.exist

    productEl.textContent = `${product.title} exist: `

    aEl.appendChild(productEl)
    parentEl.appendChild(aEl)
    parentEl.appendChild(existEl)
    parentEl.appendChild(btnEl)

    return parentEl

}

// Remove product
const removeProduct = (products, product) => {

    const newProducts = products.filter(item => item.id != product.id)
    renderProducts(newProducts)

}

// Add event to elements
const addEventEl = () => {

}

// Show available productsa
const availabaleProducts = (products, checked) => {

    if (checked) {
        products.forEach(item => {
            if (item.exist) {
                showProducts.innerHTML = ''
                const newElement = document.createElement('p')
                newElement.textContent = `${item.title} exist: ${item.exist}`
                showProducts.appendChild(newElement)
            }
        })
    } else {
        renderProducts(products)
    }

}

// Search product
const searchProducts = (product) => {

    const resaultProduct = products.filter(item => {
        return item.title.toLowerCase().includes(product)
    })

    if (!product.length) {

        showResualt.innerHTML = ''
    } else {
        resaultProduct.forEach(item => {

            const p = document.createElement('p')
            p.textContent = item.title
            showResualt.appendChild(p)

        })
    }

}

// Change exist product
const cheangeExist = (products, product, isChecked) => {

    let indeX = products.findIndex(item => item === product)
    if (indeX !== undefined) {
        products[indeX].exist = isChecked
        renderProducts(products)
    }

}
