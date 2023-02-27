import { Container, Table, Button } from "react-bootstrap";
import CreateCategory from './modal/Create'
import { useState } from 'react';

const ListCategories = () => {
    const [visible, setVisibility] = useState(false);
    const onOpen = () => setVisibility(true);
    const onClose = () => setVisibility(false);


    return (
        <Container>
        <Button variant='outline-primary' onClick={onOpen}>Create new Category</Button>
        <CreateCategory visible={visible} onClose={onClose} /> 
            <Table>
                <thead>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                </thead>
            </Table>
        </Container>
    )
}

export default ListCategories;