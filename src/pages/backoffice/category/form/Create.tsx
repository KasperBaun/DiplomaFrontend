import Category from "@models/Category";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import { Button, Form } from "react-bootstrap";

const CreateForm = () => {

    const { categoryStore } = useContext(MobXContext);

    const category: Category = {
        id: 1,
        imageUrl: "https://via.placeholder.com/150",
        name: "Test placeholder",
        order:1,
        description: "test"
    };

    function createCategory(category: Category) {
        const createCategoryAsync = async () => {
            try {
                await categoryStore.createCategory(category)
            }
            catch (err) {
                console.log(err);
            }
        }
        createCategoryAsync();
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Image Url</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: "0.5rem" }}>
                Submit
            </Button>
        </Form>
    )
}

export default CreateForm;