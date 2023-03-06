import { Container, Modal } from "react-bootstrap";
import UpdateForm from "./UpdateSubcategoryForm";
import { observer } from "mobx-react-lite";
import SubCategory from "@models/SubCategory";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";

interface IUpdateSubCategoryModalProps {
    visible: boolean;
    onClose: () => void;
    subcategory?: SubCategory;
}

const UpdateSubcategoryModal: React.FC<IUpdateSubCategoryModalProps> = observer(function UpdateSubcategoryModal(props: IUpdateSubCategoryModalProps) {
    const { languageStore } = useContext(MobXContext);
    
    if (props.subcategory) {
        return (
            <Modal show={props.visible} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{languageStore.currentLanguage.createSubcategoryUpdate} {props.subcategory.name ? props.subcategory.name : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateForm subcategory={props.subcategory} />
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