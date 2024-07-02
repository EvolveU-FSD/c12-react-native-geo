import express from 'express'
import { configureServer } from '../app.js'
import './databaseHelper.js'

let server

export async function createServer() {
    return new Promise((resolve, reject) => {
        const app = express()
        configureServer(app)
        server = app.listen(() => {
            resolve(server)
        }).on('error', reject);    
    })
}

export function getHttpPort() {
    return server.address().port
}

export async function closeServer() {
    if (server) {
        return new Promise((resolve, reject) => {
            server.close((err) => {
                if (err) return reject(err)
                resolve()
            })            
        })
    }
}

export async function executeGet(path) {
    const url = "http://localhost:"+getHttpPort()+path
    return fetch(url)
}

export async function executeGetOrDie(path) {
    const response = await executeGet(path)
    if (response.status !== 200) {
        throw new Error('Get returned status '+response.status)
    }
    return response.json()
}

beforeEach(async () => {
    return createServer()
})

afterEach(async () => {
    return closeServer()
})

afterAll(() => {
})
