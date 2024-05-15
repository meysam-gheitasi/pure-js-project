// Create  date /C
const timestamp = moment().valueOf()


// Save products to Storage /c
const saveProducts = (products) => {
    products !== null && localStorage.setItem('products', JSON.stringify(products))
}

// Show products
const showDataProducts = () => {

    const dataStorage = JSON.parse(localStorage.getItem('products'))
    if (dataStorage !== null)
        products = dataStorage
    return products
}

// Add new product /c
const addProduct = (products, product, price, isChecked) => {

    const id = uuid()
    products.push({
        id: id,
        title: product,
        price: price,
        exist: isChecked,
        created: timestamp,
        updated: timestamp
    })
}

// Render products //check code with ai...
const renderProducts = (products, filters) => {

    products = sortProducts(products, filters.sortBy)
    
    document.querySelector('#show-products').innerHTML = ''
    products.forEach(item => {
        document.querySelector('#show-products').appendChild(createElementDOM(products, item))
    })
}

const createElement = element => {
    return document.createElement(element)
}

// Create element
const createElementDOM = (products, product) => {

    const parentEl = createElement('div')

    const aEl = createElement('a')
    aEl.setAttribute('href', `./productSingle.html#${product.id}`)

    const productEl = createElement('span')
    const btnEl = createElement("button")

    const existEl = createElement("input");
    existEl.setAttribute("type", "checkbox");

    existEl.addEventListener('change', e => {
        const isChecked = e.target.checked
        cheangeExist(products, product, isChecked)
    })

    btnEl.setAttribute('class', 'delete-btn')
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
    saveProducts(newProducts)
    products = showDataProducts()
    renderProducts(newProducts, filters)
}

// Show available productsa
const availabaleProducts = (products, filters) => {

    if (filters) {
        products.forEach(item => {
            if (item.exist) {
                showProducts.innerHTML = ''
                const newElement = createElement('p')
                newElement.textContent = `${item.title} exist:  ${item.exist}`
                showProducts.appendChild(newElement)
            }
        })
    } else {
        renderProducts(products, filters)
    }
}

// Search product
const searchProducts = (product) => {

    const resaultProduct = products.filter(item => {
        return item.title.toLowerCase().includes(product)
    })
    product.length && renderProducts(resaultProduct, filters)
}

// Change exist product /c
const cheangeExist = (products, product, check) => {

    let indeX = products.findIndex(item => item === product)
    if (indeX !== undefined) {
        products[indeX].exist = check
        saveProducts(products)
        renderProducts(products, filters)
    }
}

// Update with index
const updateByIndex = (products, productUpdate, index) => {
    products[index] = productUpdate
}

// Last edite product time
const lastEditeMessage = (timestamp) => {
    return `Last Edit: ${moment(timestamp).locale('fa').fromNow()}`
}

// Sort products /c
const sortProducts = (products, sortBy) => {

    if (sortBy === 'byEdited') {
        return products.sort((a, b) => {
            if (a.updated > b.updated) {
                return -1
            } else if (a.updated < b.updated) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return products.sort((a, b) => {
            if (a.created > b.created) {
                return -1
            } else if (a.created < b.created) {
                return 1
            } else {
                return 0
            }
        })
    } else
        return products
}