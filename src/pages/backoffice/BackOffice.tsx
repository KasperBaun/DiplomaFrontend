
import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateCategory from './category/modal/Create'

const BackOfficeMain = () => {
    const [visible, setVisibility] = useState(false);
    const onOpen = () => setVisibility(true);
    const onClose = () => setVisibility(false);
    
    return (
        <Container>
            <Button variant='outline-primary' onClick={onOpen}>Create new Category</Button>
            <CreateCategory visible={visible} onClose={onClose} /> 
        </Container>
    )
}

export default BackOfficeMain;