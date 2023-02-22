import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from '../hooks/useForm'

export default function ModalEdit({ show, setShow, click, tempValues }) {

  const [values, handleInputChange, reset] = useForm()

  const handleClose = () => { setShow(false); reset() };

  const { id, name, lastname, age } = tempValues || {}


  return (
    <>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{JSON.stringify(values, undefined, 2)}</pre>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" name="name" defaultValue={name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Lastname</Form.Label>
              <Form.Control type="text" placeholder="Enter lastname" name="lastname" defaultValue={lastname} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Age (number)</Form.Label>
              <Form.Control type="number" placeholder="Enter age" name="age" defaultValue={age} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => click(id, values)}>Edit</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
