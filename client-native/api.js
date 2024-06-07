const baseUrl = process.env.EXPO_PUBLIC_BASE_URL

async function getOrDie(path) {
    const url = baseUrl+path
    const response = await fetch(url)
    if (response.status !== 200) {
        throw new Error('Failed to get ' + url + ' returned status ' + response.status)
    }
    return await response.json()
}

export async function getAllFavorites() {
    return getOrDie('/api/favorites/all')
}
