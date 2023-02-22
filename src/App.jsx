import { useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import ModalEdit from '../component/ModalEdit';
import ModalSave from '../component/ModalSave';
import { usePersons } from '../hooks/usePersons';

function App() {

  const [showModalCreate, setShowModalCreate] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)

  const [tempValues, setTempValues] = useState({})

  const showCreate = () => setShowModalCreate(true)

  const showEdit = (e) => { setShowModalEdit(true); setTempValues(e) }

  const { persons, create, edit, remove } = usePersons()

  return (
    <div className="App">
      <Button variant="success" onClick={() => showCreate()}>add +</Button>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>lastname</th>
            <th>age</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {
            persons.map((e, i) => (
              <tr key={i}>
                <th>{e.id}</th>
                <td>{e.name}</td>
                <td>{e.lastname}</td>
                <td>{e.age}</td>
                <td>
                  <Button onClick={() => showEdit(e)} variant="secondary">edit</Button>
                  <Button onClick={() => remove(e.id)} variant="danger" >delete</Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>

      <ModalSave
        show={showModalCreate}
        setShow={setShowModalCreate}
        click={create} />

      <ModalEdit
        show={showModalEdit}
        setShow={setShowModalEdit}
        click={edit}
        tempValues={tempValues} />


    </div>
  )
}

export default App
