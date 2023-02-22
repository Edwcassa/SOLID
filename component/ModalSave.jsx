import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from '../hooks/useForm'

export default function ModalSave( { show, setShow, click}) {

  const [values, handleInputChange, reset] = useForm()

  const handleClose = () => { setShow(false); reset() };


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
              <Form.Control type="text" placeholder="Enter name" name="name" onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Lastname</Form.Label>
              <Form.Control type="text" placeholder="Enter lastname" name="lastname" onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Age (number)</Form.Label>
              <Form.Control type="number" placeholder="Enter age" name="age" onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => click(values)}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
