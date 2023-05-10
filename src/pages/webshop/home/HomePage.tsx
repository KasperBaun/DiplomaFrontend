import { observer } from "mobx-react-lite"
import React from "react";
import { SelectedCategories } from "./SelectedCategories";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductItemWeb } from "@models/ProductItemWeb";
import { Box, Typography, Button, Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const HomePage: React.FC = observer(function HomePage() {

    const { webshopStore, languageStore } = useContext(MobXContext);
    const navigate = useNavigate();
    function handleClick(product: ProductItemWeb) {
        navigate('/product/' + product.id)
    }

    // If you're wondering about the slice.sort.slice call it's because MobX wont allow you to sort an observable array directly because it mutates the array in-place, which is not allowed inside a derivation
    let uniqueProductIds = new Set();
    let productItemsForSlide = webshopStore.ProductItems.slice()
        .sort((p1, p2) => p2.createdDate.valueOf() - p1.createdDate.valueOf())
        .filter(item => {
            if (!uniqueProductIds.has(item.productId)) {
                uniqueProductIds.add(item.productId);
                return true;
            }
            return false;
        })
        .slice(0, 6);


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
            <Grid container justifyContent="center">
                <Grid item xs={12} textAlign="center" sx={{ mt: 2 }}>
                    <Carousel
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false}
                        onChange={handleSlide}
                    >
                        {productItemsForSlide.map((product) => (
                            <Grid item xs={12} key={product.id}>
                                <Grid item xs={12}>
                                    <Box textAlign="center">
                                        <img
                                            src={
                                                product.images[0]?.url
                                                    ? product.images[0]?.url
                                                    : 'https://via.placeholder.com/300x300.png?text=No+image'
                                            }
                                            alt={product.product.name}
                                            style={{
                                                objectFit: 'cover',
                                                minWidth: '50rem',
                                                maxHeight: '30rem',
                                            }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box>
                                        <Typography variant="h5">
                                            {product.product.name}
                                        </Typography>
                                        <Typography variant="body1">
                                            {product.product.manufacturer}
                                        </Typography>
                                        <Typography variant="h6">
                                            {product.currentPrice} DKK
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box>

                                        <Button
                                            variant="contained"
                                            sx={{ mt: 2 }}
                                            onClick={() => handleClick(product)}
                                        >
                                            {languageStore.currentLanguage.seeProductBtn}
                                        </Button>

                                    </Box>
                                </Grid>

                            </Grid>
                        ))}
                    </Carousel>
                </Grid >

                <SelectedCategories />
            </Grid >
        );
    }
});

export default HomePage;



