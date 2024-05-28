// create  date with moment package js
const timestamp = () => {

    let time = moment().valueOf()
    return time
}
// show last edite
const lastEditeMessage = (timestamp) => {
    return `Last Edit: ${moment(timestamp).locale('fa').fromNow()}`
}
// create new id by uuid package js
const createID = () => {
    const id = uuid()
    return id
}
// get cart as localStorage or return empty array
const getData = (key) => {

    return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : []
}
// save data to localstorage
const saveData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}
// import update product by id
const updateById = (product, elUpdateTime, key) => {

    product.updated = timestamp()

    let value = getData(key)
    const itemIndex = value.findIndex(item => item.id === product.id)

    if (itemIndex !== -1) {
        value[itemIndex] = {
            id: product.id,
            title: product.title,
            price: product.price,
            amount: product.amount,
            exist: product.exist,
            image: product.image,
            created: product.created,
            updated: product.updated
        }
        elUpdateTime.textContent = lastEditeMessage(result.updated)
        saveData(key, value)
    }
    return
}
// remove children HTML
const removeAllChildren = (element) => {

    while (element.children.length > 0) {
        element.removeChild(element.children[0])
    }
}
// remove and save data with ID
const remove = (id, key) => {

    let value = getData(key)
    value = value.filter(item => item.id !== id)
    saveData(key, value)
}
// remove all data
const removeAllData = (key, value) => {

    const dataId = value.map(item => item.id)
    dataId.forEach(item => remove(item, key, value))
}
// get a data as local storag by Id
const getById = (id, key) => {
    let data = JSON.parse(localStorage.getItem(key))
    return data.find(item => item.id === id)
}
// decrease or increase methode with save and delete amount ziro
const changeAmount = (item, type, key, value) => {

    let id = item.dataset.id
    let product = value.find(item => item.id === id)

    if (type === 'increase') {
        product.amount += 1
        item.nextElementSibling.innerText = product.amount
    } else if (type === 'decrease' && product.amount > 1) {
        product.amount -= 1
        item.previousElementSibling.innerText = product.amount
    } else {
        removeAllChildren(cartContent)
        remove = (id, key, value)
    }
    saveData(key, value)
}
// change exist product
const changeExist = (id, isChecked, key) => {

    const value = getData(key)
    let product = value.find(item => item.id === id)
    product.exist = isChecked
    saveData(key, value)
}
// create event delete or change amount product
const eventDeleteOrChangeAmountOrExist = (element, classElement, key) => {

    const value = getData(key)

    element.addEventListener('click', e => {

        const id = e.target.dataset.id

        if (e.target.classList.contains(classElement)) {
            const parentDiv = e.target.closest('div')
            parentDiv.remove()
            remove(id, key)
        }
        e.target.classList.contains('exist-item') && changeExist(id, e.target.checked, key)

        e.target.classList.contains('fa-chevron-up') && changeAmount(e.target, 'increase')

        e.target.classList.contains('fa-chevron-down') && changeAmount(e.target, 'decrease')
    })
}
// create new product with push in array and save to local storage and post to json file
const createProduct = (name, price, amount, check, key) => {

    const id = createID()
    const time = timestamp()
    let value = getData(key)
    value.push({
        id: id,
        title: name,
        price: price,
        amount: amount,
        exist: check,
        image: '../images/product-1.jpg',
        created: time,
        updated: time
    })
    saveData(key, value)
    render('byCreated', 'products')
}

// sort data
const sortProducts = (sortBy, value) => {

    if (sortBy === 'byEdited') {
        return value.sort((a, b) => {
            if (a.updated > b.updated) {
                return -1
            } else if (a.updated < b.updated) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return value.sort((a, b) => {
            if(a.created > b.created) {
                return -1
            } else if(a.created < b.created) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return value
    }
   
}

// change exist product with indexOf return true and false
const cheangeExist = (value, product, check) => {
    let index = value.indexOf(product);
    if (index !== -1) {
        value[index].exist = check;
        return true
    }
    return false
}
const createElement = element => {
    return document.createElement(element)
}
const render = (sortBy, key) => {

    let value = getData(key)
    value = sortProducts(sortBy, value)

    const showProducts = document.querySelector('#show-products')
    showProducts.innerHTML = ''

    value.forEach(item => showProducts.appendChild(createElements(item)))

    eventDeleteOrChangeAmountOrExist(showProducts, 'delete-btn', key)
}
// create elements with parent // use methode in loop array
const createElements = (item) => {

    const nameEl = createElement('h4')
    nameEl.textContent = item.title

    const priceEl = createElement('h4')
    priceEl.textContent = `${item.price}$`

    const amountEl = createElement('h4')
    amountEl.textContent = `amount:${item.amount}`

    const aEl = createElement('a')
    aEl.setAttribute('href', `./pages/editedProducts.html#${item.id}`)
    aEl.append(nameEl, priceEl)

    const existEl = createElement("input");
    existEl.setAttribute('data-id', item.id)
    existEl.classList.add('exist-item')
    existEl.setAttribute("type", "checkbox");
    existEl.checked = item.exist

    const btnEl = createElement("button")
    btnEl.setAttribute('data-id', item.id)
    btnEl.classList.add('delete-btn')
    btnEl.textContent = 'Delete'

    const container = document.createElement('div');
    container.append(aEl, existEl, btnEl)

    return container
}
// search to products name data
const searchName = (title, key) => {

    const value = getData(key)
    let searchData = value.filter(item => item.title.toLowerCase().includes(title))
    if (searchData.length) {
        saveData('searchData', searchData)
        render('byCreate', 'searchData')
    }
}
// helper function to function displayValues
const updateElementValue = (element, value) => {

    if (element instanceof HTMLInputElement) {
        element.type === 'checkbox'
            ?
            element.checked = value
            :
            element.value = value
    } else {
        element.textContent = value
    }
}
// function to display product values
const displayValues = (result) => {

    updateElementValue(titleEl, result.title)
    updateElementValue(priceEl, result.price)
    updateElementValue(existEl, result.exist)
    updateElementValue(dateEl, lastEditeMessage(result.updated))
}