import { matchRoutes } from '../router-util'

function reactRouterFetch(routes, location, options) {
    const branch = matchRoutes(routes, location.pathname)
    if (branch.length > 0) {
        const promises = branch
            .filter(({ route }) => route.component && route.component.fetch)
            .map(({ route, match }) => {
                return route.component.fetch && route.component.fetch(match, location, options)
            })
        if (promises && promises.length > 0) {
            return Promise.all(promises).then((arr) => {
                let o = {};
                arr.map((item) => Object.assign(o, item))
                return o;
            })
        } else {
            return Promise.resolve()
        }
    } else {
        return Promise.resolve()
    }
}

export default reactRouterFetch