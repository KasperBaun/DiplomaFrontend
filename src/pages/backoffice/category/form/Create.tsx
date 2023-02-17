import { Button, Form } from "react-bootstrap";

const CreateForm = () => {

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