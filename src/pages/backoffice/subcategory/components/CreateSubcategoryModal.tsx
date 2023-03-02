import { Modal } from "react-bootstrap";
import CreateSubcategoryForm from "./CreateSubcategoryForm";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";

export interface IProps {
    visible: boolean
    onClose: () => void;
}

const CreateSubcategoryModal = ({ onClose, visible }: IProps) => {

    const { languageStore } = useContext(MobXContext);

    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{languageStore.currentLanguage.createSubcategoryModalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateSubcategoryForm />
            </Modal.Body>
        </Modal>
    )
}

export default CreateSubcategoryModal;