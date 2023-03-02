import { Modal } from "react-bootstrap";
import CreateForm from "../form/Create";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";

interface IProps {
    visible: boolean
    onClose: () => void;
}

const CreateCategory = ({ onClose, visible }: IProps) => {

    const { languageStore } = useContext(MobXContext);

    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{languageStore.currentLanguage.createCategoryModalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateForm />
            </Modal.Body>
        </Modal>
    )
}

export default CreateCategory;