import { Dispatch, SetStateAction } from "react";
import { Modal, Image, Container, Carousel } from "react-bootstrap";

interface IProps {
    imageUrls : string[]
    handleClose : Dispatch<SetStateAction<void>>;
    show : boolean;
}

const ImageModal = ({imageUrls, handleClose, show} : IProps) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Container style={{ textAlign: "center" }}>
                    <Carousel>
                        { imageUrls.map((image) => (
                            <Carousel.Item>
                                <img style={{ objectFit: "fill" }}
                                className="d-block w-100"
                                src={image}
                                alt="First slide"
                                />
                            </Carousel.Item>
                        )) }
                    </Carousel>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default ImageModal;