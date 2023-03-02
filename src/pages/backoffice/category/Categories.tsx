import { Container, Table, Button, Spinner, Row } from "react-bootstrap";
import CreateCategory from './modal/Create'
import { useState } from 'react';
import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react"
import "./css/category.scss";
import { XLg } from "react-bootstrap-icons";
import { Pencil } from "react-bootstrap-icons";
import UpdateCategory from "./modal/UpdateModal";
import Category from "@models/Category";

const ListCategories: React.FC = function ListCategories() {
    const [visibleCreate, setVisibilityCreate] = useState(false);
    const [visibleUpdate, setVisibilityUpdate] = useState(false);
    const onOpenCreate = () => setVisibilityCreate(true);
    const onCloseCreate = () => setVisibilityCreate(false);
    const onOpenUpdate = () => setVisibilityUpdate(true);
    const onCloseUpdate = () => setVisibilityUpdate(false);

    const { categoryStore, languageStore } = useContext(MobXContext)
    const [selectedCategory, setSelectedCategory] = useState<Category>();

    const handleOnDeleteCategory = async (id: number) => {
        // Pop Modal to confirm?
        const catToBeDeleted = categoryStore.getCategory(id);
        if (catToBeDeleted !== null) {
            const deleted = await categoryStore.deleteCategory(id);
            if (deleted) {
                // Alt er godt
                alert("Successfully deleted category: " + catToBeDeleted.name)
            } else {
                // Alt er lort
            }
        } else {
            alert("Could not find category with id: " + id);
        }
    }

    const handleOnUpdateCategory = (cat: Category) => {
        setSelectedCategory(cat);
        onOpenUpdate();
    }

    if (categoryStore.Categories)
        return (
            <Container className="CategoryListContainer">
                <Row style={{ width: "100%", justifyContent: "end" }}>
                    <Button style={{ width: "12rem" }} variant='outline-primary' onClick={onOpenCreate}>{languageStore.currentLanguage.createCategoryModalTitle}</Button>
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
                            {categoryStore.Categories.map((category) => (
                                <tr id={"listId_" + category.id} key={"item_" + category.id}>
                                    <td style={{ width: "12rem" }}>{category.name}</td>
                                    <td>{category.description ? category.description : null}</td>
                                    <td style={{ width: "8rem" }}>{category.order ? category.order : null}</td>
                                    <td style={{ width: "10rem" }}>
                                        <Container>
                                            <Button variant="outline-secondary" onClick={() => handleOnUpdateCategory(category)}><Pencil /></Button>
                                            <Button variant="outline-danger" onClick={() => handleOnDeleteCategory(category.id)}><XLg /></Button>
                                        </Container>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                <CreateCategory visible={visibleCreate} onClose={onCloseCreate} />
                <UpdateCategory visible={visibleUpdate} onClose={onCloseUpdate} category={selectedCategory} />
            </Container>
        )
    else
        return (
            <Container style={{ textAlign: "center", padding: "15rem" }}>
                <Spinner animation="grow" variant="secondary" /> Loading...
            </Container>
        )

}

export default observer(ListCategories);

