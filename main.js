'use strict'

const openModal = () => document.getElementeById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    nome: "Fernandosao carlos moraes",
    email: "fernandomoraes@gmail.com",
    celular: "22956512317",
    cidade: "Rolandia"
}

const getLocaStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

const deletClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index,1)
    setLocalStorage(dbClient)
}


const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}


const readClient= () => getLocaStorage()


const createClient = (client) => {
    const dbClient = getLocaStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}

document.getElementeById('cadastrarCliente')
    .addEventListener('click',openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)