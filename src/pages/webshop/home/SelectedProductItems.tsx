import Loading from "@components/loading/Loading";
import { ProductItemWeb } from "@models/ProductItemWeb";
import { Button, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Carousel, CarouselItem, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const SelectedProductItems = observer(function SelectedProductItems() {
    const { webshopStore, languageStore } = useContext(MobXContext);
    const navigate = useNavigate();
    function handleClick(product: ProductItemWeb) {
        navigate('/product/' + product.id)
    }

    // If you're wondering about the slice.sort.slice call it's because MobX wont allow you to sort an observable array directly because it mutates the array in-place, which is not allowed inside a derivation
    let productItemsForSlide = webshopStore.ProductItems.slice().sort((p1, p2) => p2.createdDate.valueOf() - p1.createdDate.valueOf()).slice(0, 6);

    if (webshopStore.ProductItems) {
        //console.log(toJS(productStore.ProductItems))
        const handleSlide = () => {
            const caption = document.querySelector('.carousel-caption');
            if (caption) {
                caption.classList.add('slide-in');
                setTimeout(() => {
                    caption.classList.remove('slide-in');
                }, 300);
            }
        };

        return (
            <Container>
                <Carousel className="CarouselFrontpage" fade onSlide={handleSlide}>
                    {productItemsForSlide.map((product) => (
                        <CarouselItem key={product.id}>
                            <div style={{ textAlign: 'center' }}>
                                <img className="CarouselItemImg"
                                    src={product.images[0]?.url ? product.images[0]?.url : "https://via.placeholder.com/300x300.png?text=No+image"}
                                    alt={product.product.name}
                                    style={{ objectFit: 'cover', minWidth: '50rem', maxHeight: '30rem' }}
                                />
                            </div>
                            <Typography className="CarouselItemName" variant="h5">
                                {product.product.name}
                            </Typography>
                            <Typography className="CarouselItemManu" variant="body1">
                                {product.product.manufacturer}
                            </Typography>
                            <Typography className="CarouselItemPrice" variant="h6">
                                {product.currentPrice} DKK
                            </Typography>
                            <div className="CarouselItemBtnDiv">
                                <Button onClick={() => handleClick(product)}>
                                    {languageStore.currentLanguage.seeProductBtn}
                                </Button>
                            </div>
                            {/* <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', transform: 'translateY(0)' }}>
                            <h3 style={{ color: '#fff' }}>{product.product.name}</h3>
                            <p style={{ color: '#fff' }}>{product.product.manufacturer}</p>
                            <h5 style={{ color: '#fff' }}>{product.price} DKK</h5>
                        </Carousel.Caption> */}
                        </CarouselItem>
                    ))}
                </Carousel>
            </Container>
        )
    }
    else {
        return <Loading />
    }
});