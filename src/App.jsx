import { Table, Modal, Button, Form } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'

const api_url = "https://63f370d4fe3b595e2ee1dac3.mockapi.io/api/persons"

function App() {

  const [data, setData] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); reset(); setDataRow(null) };
  const handleShow = () => setShow(true);

  const [values, handleInputChange, reset] = useForm()
  const [dataRow, setDataRow] = useState(null)

  const [typeButton, setTypeButton] = useState('')

  const showEdit = (e) => {
    setDataRow(e)
    handleShow()
    setTypeButton('edit')
  }

  const showCreate = (e) => {
    handleShow()
    setTypeButton('add')
  }

  // METODOS CRUD
  const getAll = async () => {
    await fetch(api_url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }

  useEffect(() => {
    getAll()
  }, [])

  const create = async () => {
    await fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
      .then(resp => resp.json())
      .then(() => {
        alert('✔️ success')
        handleClose()
        getAll()
      })
  }

  const edit = async (id) => {
    // console.log(values)
    await fetch(`${api_url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
      .then(resp => resp.json())
      .then(() => {
        alert('☑ edit success')
        handleClose()
        getAll()
      })
  }

  const remove = async (id) => {
    await fetch(`${api_url}/${id}`, {
      method: 'DELETE'
    })
      .then(resp => resp.json())
      .then(() => {
        alert('💯 deleted')
        getAll()
      })
  }

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
            data.map((e, i) => (
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






      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{JSON.stringify(values, undefined, 2)}</pre>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" name="name" defaultValue={dataRow?.name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Lastname</Form.Label>
              <Form.Control type="text" placeholder="Enter lastname" name="lastname" defaultValue={dataRow?.lastname} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Age (number)</Form.Label>
              <Form.Control type="number" placeholder="Enter age" name="age" defaultValue={dataRow?.age} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {
            typeButton == 'add' ?
              <Button variant="primary" onClick={() => create()}>Create</Button>
              :
              <Button variant="primary" onClick={() => edit(dataRow?.id)}>Edit</Button>
          }
        </Modal.Footer>
      </Modal>





    </div>
  )
}

export default App
