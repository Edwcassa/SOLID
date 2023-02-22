import { useEffect, useState } from "react"
import { getAllPersons, createPerson, editPerson, removePerson } from '../services/personServices';

export const usePersons = () => {

  const [persons, setPersons] = useState([])

  // METODOS CRUD
  const getTodo = () => {
    getAllPersons().then((persons) => {
      setPersons(persons)
    })
  }
  useEffect(() => {
    getTodo()
  }, [])

  const create = async (values) => {
    await createPerson(values)
      .then(newPerson => {
        alert('✅ created')
        setPersons((prevPersons) => prevPersons.concat(newPerson))
      })
  }

  const edit = async (id, values) => {
    editPerson(id, values)
      .then(() => {
        alert('☑ edit success')
        getTodo()
      })
  }

  const remove = async (id) => {
    await removePerson(id)
      .then(() => {
        alert('💯 deleted')
        getTodo()
      })
  }

  return { persons, getTodo, create, edit, remove }
}