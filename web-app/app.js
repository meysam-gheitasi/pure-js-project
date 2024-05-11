import {showPost} from './pages/posts.js'

const navTo = (url) => {
    history.pushState(null, null, url)
    router()
}

const router = () => {
    const routes = [
        { path: '/web-app/index', view: () => console.log('/index') },
        { path: '/web-app/last-videos', view: () => console.log('/last-videos') },
        { path: '/web-app/last-posts', view: showPost }
    ]

    let matchRoutes = routes.map(item => {
        return {
            route: item,
            isMatch: location.pathname === item.path
        }
    })

    const match = matchRoutes.find(item => item.isMatch)

    if(!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }
    document.querySelector('#app').innerHTML = match.route.view()
    console.log(match.route.view());

}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {

    document.body.addEventListener('click', e => {
        if(e.target.matches('[data-link]')) {
            e.preventDefault()
            navTo(e.target.href)
        }
    })

    router()
})