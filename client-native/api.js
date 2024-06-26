const baseUrl = process.env.EXPO_PUBLIC_BASE_URL

let username = ''
let password = ''

export function setApiCredentials(user, pass) {
    username = user
    password = pass
}

async function getOrDie(path) {
    const url = baseUrl+path

    console.log('Doing get for',path,'with credentials', { username, password })
    const response = await fetch(url)
    if (response.status !== 200) {
        throw new Error('Failed to get ' + url + ' returned status ' + response.status)
    }
    return await response.json()
}

async function postOrDie(path, payload) {
    const url = baseUrl+path

    console.log('Doing post to',path,'with credentials', { username, password })

    const response = await fetch(url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.status !== 200) {
        throw new Error('Failed to get ' + url + ' returned status ' + response.status)
    }
    return await response.json()
}


export async function getAllFavorites() {
    return getOrDie('/api/favorites/all')
}

export async function login(username, password) {
    return postOrDie('/api/user/login', { username, password })
}
