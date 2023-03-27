import { Container } from "@mui/material"
import { Spinner } from "react-bootstrap"

const Loading: React.FC = function Loading() {
    return (
        <Container style={{ textAlign: "center", padding: "15rem" }}>
            <Spinner animation="grow" variant="secondary" /> Loading...
        </Container>
    )
}

export default Loading;