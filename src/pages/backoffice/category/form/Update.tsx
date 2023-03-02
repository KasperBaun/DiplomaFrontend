import Category from "@models/Category";
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";

interface IProps {
    category: Category
}

const UpdateForm = ({ category }: IProps) => {

    const { categoryStore } = useContext(MobXContext);

    const [title, setTitle] = useState<string>(category.name);
    const [url, setUrl] = useState<string>(category.imageUrl ? category.imageUrl : "");
    const [order, setOrder] = useState<number>(category.order ? category.order : 0);
    const [description, setDescription] = useState<string>(category.description ? category.description : "");

    function updateCategory(updatedCategory: Category) {

    }

    return (
        <Form>
            <Form.Group className="UpdateFormImageFormGroup">
                <Image className="UpdateFormImage" src={category.imageUrl ? category.imageUrl : ""} alt="No image" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control value={category.name ?
                    category.name : ""} type="text" onChange={(event) => {
                        let temp = event.target.value;
                        setTitle(temp);
                    }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Order</Form.Label>
                <Form.Control value={category.order ?
                    category.order : ""} type="text" onChange={(event) => {
                        let temp = event.target.value;
                        setOrder(parseInt(temp));
                    }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Image Url</Form.Label>
                <Form.Control value={category.imageUrl ?
                    category.imageUrl : ""} type="text" onChange={(event) => {
                        let temp = event.target.value;
                        setUrl(temp);
                    }} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control value={category.description ?
                    category.description : ""} type="textarea" onChange={(event) => {
                        let temp = event.target.value;
                        setDescription(temp);
                    }} />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: "0.5rem" }} >
                Submit
            </Button>
        </Form>
    )
}

export default UpdateForm;