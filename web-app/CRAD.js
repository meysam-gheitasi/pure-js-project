// create  date with moment package js
const timestamp = () => {

    let time = oment().valueOf()
    return time
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
// remove children HTML
const removeAllChildren = (element) => {

    while (element.children.length > 0) {
        element.removeChild(element.children[0])
    }
}
// remove a data with ID
const remove = (id, key, value) => {

    value = value.filter(item => item.id !== id)
    saveData(key, value)
}
// remove all data
const removeAllData = (key, value) => {

    const dataId = value.map(item => item.id)
    dataId.forEach(item => remove(item, key, value))
}
// get a data as local storag by Id
const getById = (key, id) => {

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
const existChange = (item, key, value) => {

    item.addEventListener('change', e => {
        const isChecked = e.target.checked
        let index = value.indexOf(product);
        if (index !== -1) {
            value[index].exist = isChecked;
            saveData(key, value)
        }
    })
}
// create event delete or change amount product
const eventDeleteOrChangeAmountOrExist = (element, classElement, key, value) => {

    element.addEventListener('click', e => {

        if (e.target.classList.contains(classElement)) {

            let item = e.target
            let id = item.dataset.id

            element.removeChild(item.parentElement.parentElement)
            remove(id, key, value)
        }

        e.target.classList.contains('fa-chevron-up') && changeAmount(e.target, 'increase')

        e.target.classList.contains('fa-chevron-down') && changeAmount(e.target, 'decrease')

        e.target.classList.contains('exist-item') && existChange(e.target, key, value)
    })
}
// create new product with push in array and save to local storage and post to json file
const createProduct = (name, price, check, key, value) => {

    const id = createID()
    value.push({
        id: id,
        title: name,
        price: price,
        exist: check,
        created: timestamp(),
        updated: timestamp()
    })
    saveData(key, value)
    postData(value)
}
// post json to save in json file
const postData = async (value) => {

    const jsonData = JSON.stringify(value.map((item) => {
        return {
            sys: { id: item.id },
            fields: {
                title: item.name,
                price: parseFloat(item.price),
                created: item.created,
                updated: item.updated,
                image: { fields: { file: { url: './images/product-1.jpg' } } }
            }
        };
    }));

    try {
        const respons = await fetch('products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        // for test this method
        const data = await respons.json()
        console.log('Send data success.');
        return data
    } catch (error) {
        console.log('Error is:', error)
        throw error;
    }
}
// sort data
const sortProducts = (sortBy, value) => {

    const compareFunction = (a, b) => {
        if (a[sortBy] > b[sortBy]) {
            return -1;
        } else if (a[sortBy] < b[sortBy]) {
            return 1;
        } else {
            return 0;
        }
    };

    if (sortBy === 'byEdited' || sortBy === 'byCreated') {
        return value.sort(compareFunction);
    } else {
        return value;
    }
}
// show last edite
const lastEditeMessage = (timestamp) => {
    return `Last Edit: ${moment(timestamp).locale('fa').fromNow()}`
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
const render = (sortBy, key, value) => {

    const showProducts =  document.querySelector('#show-products')
    
    value = sortProducts(sortBy, value)
    let elements =value.map(item => createElements(item))

    showProducts.appendChild(elements)

    eventDeleteOrChangeAmountOrExist(showProducts, 'delete-btn', key, value)

}

const createElements = (item) => {

    const nameEl = createElement('h4')
    nameEl.textContent = item.title

    const priceEl = createElement('h4')
    priceEl.textContent = `${item.price}$`

    const amountEl = createElement('h4')
    nameEl.textContent = `amount:${item.amount}`

    const aEl = createElement('a')
    aEl.setAttribute('href', `./productSingle.html#${item.id}`)
    aEl.append(nameEl, priceEl)

    const existEl = createElement("input");
    existEl.setAttribute('data-id', item.id)
    btnEl.classList.add('exist-item')
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