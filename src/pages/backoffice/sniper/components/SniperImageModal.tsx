import { Dispatch, SetStateAction } from "react";
import { Modal, Container, Carousel } from "react-bootstrap";

interface IProps {
    imageUrl : string
    handleClose : Dispatch<SetStateAction<void>>;
    show : boolean;
}

const ImageModal = ({imageUrl, handleClose, show} : IProps) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Container style={{ textAlign: "center" }}>
                    <Carousel>
                        <Carousel.Item>
                            <img style={{ objectFit: "fill" }}
                            className="d-block w-100"
                            src={imageUrl}
                            alt="First slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default ImageModal;