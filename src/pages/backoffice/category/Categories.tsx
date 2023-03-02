import { Container, Table, Button, Spinner, Row, Col, ButtonGroup } from "react-bootstrap";
import CreateCategory from './modal/Create'
import { useState } from 'react';
import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext, useEffect } from "react"
import Category from "@models/Category";
import "./css/category.scss";
import { XLg } from "react-bootstrap-icons";
import { Pencil } from "react-bootstrap-icons";
import UpdateCategory from "./modal/UpdateModal";

const ListCategories = () => {
    const [visibleCreate, setVisibilityCreate] = useState(false);
    const [visibleUpdate, setVisibilityUpdate] = useState(false);
    const onOpenCreate = () => setVisibilityCreate(true);
    const onCloseCreate = () => setVisibilityCreate(false);
    const onOpenUpdate = () => setVisibilityUpdate(true);
    const onCloseUpdate = () => setVisibilityUpdate(false);
    
    const [categories, setCategories] = useState<Category[]>(null);

    const { categoryStore } = useContext(MobXContext)

    const [selectedCategory, setSelectedCategory] = useState<Category>();

    useEffect(() => {
        const getCategoryModel = async () => {
            try {
                setCategories(await categoryStore.getCategories())
            }
            catch (err) {
                console.log(err);
            }
        }
        getCategoryModel();
    }, [categoryStore])

    const handleOnDeleteCategory = (id : number) => {
        // Pop Modal to confirm?
        categoryStore.deleteCategory(id);
    }

    const handleOnUpdateCategory = (cat : Category) => {
        setSelectedCategory(cat);
        onOpenUpdate();
    }

    if(categories)
        return (
            <Container className="CategoryListContainer">
                <Row style={{ width: "100%", justifyContent: "end" }}>
                    <Button style={{ width: "12rem" }} variant='outline-primary' onClick={onOpenCreate}>Create new Category</Button>
                </Row>
                <Row style={{ width: "100%", marginTop: "1rem"}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="CenterAligned_th">Name</th>
                            <th className="CenterAligned_th">Description</th>
                            <th className="CenterAligned_th">Order</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { categories.map((category) => (
                            <tr id={"listId_"+category.id} key={"item_" + category.id}>
                                <td style={{ width: "12rem" }}>{category.name}</td>
                                <td>{category.description ? category.description : null}</td>
                                <td style={{ width: "8rem" }}>{category.order ? category.order : null }</td>
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
                <UpdateCategory visible={visibleUpdate} onClose={onCloseUpdate} category={selectedCategory}/> 
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