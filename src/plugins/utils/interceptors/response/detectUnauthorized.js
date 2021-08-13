import _ from 'lodash'

export default (err) => {
    let code = _.get(err, 'response.status')
    if (code === 403 || code === 401) {
        window.location.replace('/403')
    }

    return Promise.reject(err)
}
