
const api_url = "https://63f370d4fe3b595e2ee1dac3.mockapi.io/api/persons"

const getAllPersons = () => {
  return fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
}

const createPerson = async (values) => {
  return fetch(api_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  })
    .then(resp => resp.json())
    .then((data) => {
      return data
    })
}

const editPerson = async (id, values) => {
  return fetch(`${api_url}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  })
    .then(resp => resp.json())
    .then((data) => {
      return data
    })
}

const removePerson = async (id) => {
  return fetch(`${api_url}/${id}`, {
    method: 'DELETE'
  })
    .then(resp => resp.json())
    .then((data) => {
      return data
    })
}

export { getAllPersons, createPerson, editPerson, removePerson }