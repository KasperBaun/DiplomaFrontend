import Category from "@models/Category";
import { Modal } from "react-bootstrap";
import UpdateCategoryForm from "../components/UpdateCategoryForm";

interface IProps {
    visible: boolean;
    onClose: () => void;
    category?: Category;
}

const UpdateCategoryModal = ({ onClose, visible, category }: IProps) => {
    if (!category || !visible) {
        return <></>
    } else if (visible && category) {
        return (
            <Modal show={visible} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update {category.name ? category.name : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateCategoryForm category={category} onCloseUpdate={onClose} />
                </Modal.Body>
            </Modal>
        )
    } else { return <></> }
}

export default UpdateCategoryModal;