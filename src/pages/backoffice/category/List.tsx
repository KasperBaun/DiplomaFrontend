import { Container, Table } from "react-bootstrap";

const ListCategories = () => {

    return (
        <Container>
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