import _ from 'lodash'
import store from "@/store";

export default async (err) => {
    if ([419].indexOf(_.get(err, 'response.status')) !== -1) {
        await store.dispatch('csrf/fetchCsrf')
    }

    throw err
}
