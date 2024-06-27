import base64 from 'base-64'
const baseUrl = process.env.EXPO_PUBLIC_BASE_URL

let username = ''
let password = ''

export function setApiCredentials(user, pass) {
    username = user
    password = pass
}

export function clearApiCredentials() {
    username=''
    password=''
}

export function hasApiCredentials() {
    return username !== ''
}

function withCredentials(headers) {
    if (hasApiCredentials()) {
        headers['Authorization'] = 'Basic '+base64.encode(`${username}:${password}`)
    }
    return headers
}

async function getOrDie(path) {
    const url = baseUrl+path
    const response = await fetch(url,{
        method: 'get',
        headers: withCredentials({})
    })
    if (response.status !== 200) {
        throw new Error('Failed to get ' + url + ' returned status ' + response.status)
    }
    return await response.json()
}

async function postOrDie(path, payload) {
    const url = baseUrl+path
    const response = await fetch(url, {
        method: 'post',
        headers: withCredentials({
            "Content-Type": "application/json"
        }),
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

export async function createFavorite(name, latitude, longitude) {
    return postOrDie('/api/favorites/create', { name, latitude, longitude })
}