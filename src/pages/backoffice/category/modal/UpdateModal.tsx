import Category from "@models/Category";
import { Container, Modal } from "react-bootstrap";
import UpdateForm from "../form/Update";

interface IProps {
    visible : boolean;
    onClose : () => void;
    category ?: Category;
}

const UpdateCategory = ({onClose, visible, category} : IProps) => {
    if(category) {
        return (
            <Modal show={visible} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update {category.name ? category.name : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateForm category={category} onCloseUpdate={onClose}/>
                </Modal.Body>
            </Modal>
        )
    } else {
        return (
            <Container style={{ textAlign: "center", padding: "15rem" }}>
            </Container>
        )
    }
    
}

export default UpdateCategory;