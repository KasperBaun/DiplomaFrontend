import { Modal } from "react-bootstrap";
import CreateForm from "../form/Create";

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
            <Modal.Body>
                <CreateForm />
            </Modal.Body>
        </Modal>
    )
}

export default CreateCategory;