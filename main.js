'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
    updateTable()
}

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

const isValidFields = () => document.getElementById('form').reportValidity()

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

let editIndex = null

const saveClient = (event) => {
    event.preventDefault()
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,
        }
        
        if (editIndex !== null) {
            updateClient(editIndex, client)
            editIndex = null
        } else {
            createClient(client)
        }
        
        clearFields()
        closeModal()
        updateTable()
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
}

const editClient = (index) => {
    const client = readClient()[index]
    fillFields(client)
    openModal()
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = (filteredClients = null) => {
    const dbClient = filteredClients || readClient()
    clearTable()
    dbClient.forEach(createRow)
}

function filterClients(searchTerm) {
    const dbClient = readClient()
    const filteredClients = dbClient.filter(client =>
        client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.celular.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.cidade.toLowerCase().includes(searchTerm.toLowerCase())
    )
    updateTable(filteredClients)
}

function handleInput() {
    const searchTerm = document.getElementById("search").value
    filterClients(searchTerm)
}

function checkEnter(event) {
    if (event.key === "Enter") {
        const searchTerm = document.getElementById("search").value
        filterClients(searchTerm)
    }
}

const editDelete = (event) => {
    if ((event.target.type) == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editIndex = index
            editClient(index)
        } else if (action == 'delete') {
            deleteClient(index)
        }
    }
}

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.getElementById('Cancelar')
    .addEventListener('click', closeModal)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)
