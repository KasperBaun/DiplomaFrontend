import { Button, Modal } from "react-bootstrap";

interface IProps {
    visible : boolean
    onClose : () => void;
}

const CreateCategory = ({onClose, visible} : IProps) => {

    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="outline-primary">
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateCategory;