import store from "@/store";

export default async config => {
    const { data } = store.state.auth

    if (data.token !== null) {
        Object.assign(config.headers.common, {
            Authorization: data.token_type + ' ' + data.token
        })
    }

    return config
}
