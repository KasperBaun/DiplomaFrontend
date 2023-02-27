import Category from "@models/Category";
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";

const CreateForm = () => {

    const { categoryStore } = useContext(MobXContext);

    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [order, setOrder] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    function createCategory() {
        let category: Category = {
            id: 0,
            name: title,
            imageUrl: url,
            order: order,
            description: description
        };

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
                <Form.Control type="text" onChange={(event) => {
                    let temp = event.target.value;
                    setTitle(temp);
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Order</Form.Label>
                <Form.Control type="text" onChange={(event) => {
                    let temp = event.target.value;
                    setOrder(parseInt(temp));
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Image Url</Form.Label>
                <Form.Control type="text" onChange={(event) => {
                    let temp = event.target.value;
                    setUrl(temp);
                }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="textarea" onChange={(event) => {
                    let temp = event.target.value;
                    setDescription(temp);
                }} />
            </Form.Group>
            {/* <Form.Group>
                <Form.Label>Products</Form.Label>
                <Form.Control type="text" placeholder={Localization.Handler("ProductCommaSeperatedText", localStorage.getItem('locale'))} onChange={(event) => {
                    let temp = event.target.value;
                    setProducts(temp.trim().split(","));
                }} />
                <Form.Text muted>
                </Form.Text>
            </Form.Group> */}
            <Button variant="primary" type="submit" style={{ marginTop: "0.5rem" }} onClick={createCategory}>
                Submit
            </Button>
        </Form>
    )
}

export default CreateForm;