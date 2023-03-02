import Category from "@models/Category";
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";

const CreateForm = () => {

    const { categoryStore, languageStore } = useContext(MobXContext);

    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [order, setOrder] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    async function createCategory() {
        const category: Category = ({ id: 0, name: title, imageUrl: url, order, description })

        try {
            await categoryStore.createCategory(category)
            alert(languageStore.currentLanguage.createCategorySuccessMessage);
        }
        catch (err) {
            console.log(err);
            alert(languageStore.currentLanguage.createCategoryFailedMessage);
        }
    }

    if (languageStore.isLoaded) {


        return (
            <Form>
                <Form.Group>
                    <Form.Label>{languageStore.currentLanguage.createCategoryTitle}</Form.Label>
                    <Form.Control type="text" onChange={(event) => {
                        let temp = event.target.value;
                        setTitle(temp);
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>{languageStore.currentLanguage.createCategoryOrder}</Form.Label>
                    <Form.Control type="text" onChange={(event) => {
                        let temp = event.target.value;
                        setOrder(parseInt(temp));
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>{languageStore.currentLanguage.createCategoryImgUrl}</Form.Label>
                    <Form.Control type="text" onChange={(event) => {
                        let temp = event.target.value;
                        setUrl(temp);
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>{languageStore.currentLanguage.createCategoryDescription}</Form.Label>
                    <Form.Control type="textarea" onChange={(event) => {
                        let temp = event.target.value;
                        setDescription(temp);
                    }} />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ marginTop: "0.5rem" }} onClick={createCategory}>
                    {languageStore.currentLanguage.createCategorySubmit}
                </Button>
            </Form>
        )
    }
    else {
        return (
            <Container style={{ textAlign: "center", padding: "15rem" }}>
                <Spinner animation="grow" variant="secondary" /> Loading...
            </Container>
        )
    }
}

export default CreateForm;