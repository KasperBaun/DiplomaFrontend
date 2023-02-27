import { Container, Table, Button, Spinner } from "react-bootstrap";
import CreateCategory from './modal/Create'
import { useState } from 'react';
import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext, useEffect } from "react"
import Category from "@models/Category";
import "./css/category.scss";

const ListCategories = () => {
    const [visible, setVisibility] = useState(false);
    const onOpen = () => setVisibility(true);
    const onClose = () => setVisibility(false);
    
    const [categories, setCategories] = useState<Category[]>(null);

    const { categoryStore } = useContext(MobXContext)

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

    if(categories)
        return (
            <Container>
            <Button variant='outline-primary' onClick={onOpen}>Create new Category</Button>
            <CreateCategory visible={visible} onClose={onClose} /> 
                <Table striped bordered hover>
                    <thead>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Order</th>
                        <th>Image</th>
                    </thead>
                    <tbody>
                        { categories.map((category, index) => (
                            <tr key={"item_" + index}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.description ? category.description : null}</td>
                                <td>{category.order ? category.order : null }</td>
                                <td><img className="CategoryTableImage" src={category.imageUrl ? category.imageUrl : null}></img></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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