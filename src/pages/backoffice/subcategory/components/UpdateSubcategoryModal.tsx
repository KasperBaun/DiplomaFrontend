import Category from "@models/Category";
import { Container, Modal } from "react-bootstrap";
import UpdateForm from "./UpdateSubcategoryForm";
import { observer } from "mobx-react-lite";

interface IUpdateSubCategoryModalProps {
    visible: boolean;
    onClose: () => void;
    category?: Category;
}

const UpdateSubcategoryModal: React.FC<IUpdateSubCategoryModalProps> = observer(function UpdateSubcategoryModal(props: IUpdateSubCategoryModalProps) {
    if (props.category) {
        return (
            <Modal show={props.visible} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update {props.category.name ? props.category.name : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateForm category={props.category} />
                </Modal.Body>
            </Modal>
        )
    } else {
        return (
            <Container style={{ textAlign: "center", padding: "15rem" }}>
            </Container>
        )
    }

})

export default UpdateSubcategoryModal;