import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { Spinner } from "react-bootstrap";
import SubCategory from "@models/SubCategory";
import { Pencil, XLg } from "react-bootstrap-icons";
import CreateSubcategoryModal from "./components/CreateSubcategoryModal";
import UpdateSubcategoryModal from "./components/UpdateSubcategoryModal";


const Subcategories: React.FC = observer(function Subcategories() {

    const { subCategoryStore, languageStore } = useContext(MobXContext)
    const [visibleCreate, setVisibilityCreate] = useState(false);
    const [visibleUpdate, setVisibilityUpdate] = useState(false);
    const onOpenCreate = () => setVisibilityCreate(true);
    const onCloseCreate = () => setVisibilityCreate(false);
    const onOpenUpdate = () => setVisibilityUpdate(true);
    const onCloseUpdate = () => setVisibilityUpdate(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory>();

    const handleOnDeleteCategory = async (id: number) => {
        // Pop Modal to confirm?
        const subCatToBeDeleted = await subCategoryStore.getSubcategory(id);
        if (subCatToBeDeleted !== null) {
            const deleted = await subCategoryStore.deleteSubcategory(id);
            if (deleted) {
                alert("Successfully deleted category: " + subCatToBeDeleted.name)
            } else {
                alert("Failed to delete category: " + subCatToBeDeleted.name)
            }
        } else {
            alert("Could not find subcategory with id: " + id);
        }
    }

    const handleOnUpdateCategory = (subCat: SubCategory) => {
        setSelectedSubcategory(subCat);
        onOpenUpdate();
    }

    if (subCategoryStore.subCategories)
        return (
            <Container className="CategoryListContainer">
                <Row style={{ width: "100%", justifyContent: "end" }}>
                    <Button style={{ width: "12rem" }} variant='outline-primary' onClick={onOpenCreate}>{languageStore.currentLanguage.createSubcategoryModalTitle}</Button>
                </Row>
                <Row style={{ width: "100%", marginTop: "1rem" }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="CenterAligned_th">{languageStore.currentLanguage.createCategoryTitle}</th>
                                <th className="CenterAligned_th">{languageStore.currentLanguage.createCategoryDescription}</th>
                                <th className="CenterAligned_th">{languageStore.currentLanguage.createCategoryOrder}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {subCategoryStore.subCategories.map((subCat) => (
                                <tr id={"listId_" + subCat.id} key={"item_" + subCat.id}>
                                    <td style={{ width: "12rem" }}>{subCat.name}</td>
                                    <td>{subCat.description ? subCat.description : null}</td>
                                    <td style={{ width: "8rem" }}>{subCat.order ? subCat.order : null}</td>
                                    <td style={{ width: "10rem" }}>
                                        <Container>
                                            <Button variant="outline-secondary" onClick={() => handleOnUpdateCategory(subCat)}><Pencil /></Button>
                                            <Button variant="outline-danger" onClick={() => handleOnDeleteCategory(subCat.id)}><XLg /></Button>
                                        </Container>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                <CreateSubcategoryModal visible={visibleCreate} onClose={onCloseCreate} />
                <UpdateSubcategoryModal visible={visibleUpdate} onClose={onCloseUpdate} subcategory={selectedSubcategory} />
            </Container>
        )
    else
        return (
            <Container style={{ textAlign: "center", padding: "15rem" }}>
                <Spinner animation="grow" variant="secondary" /> Loading...
            </Container>
        )
});

export default Subcategories;