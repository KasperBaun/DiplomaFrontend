import { observer } from "mobx-react-lite"
import { toJS } from "mobx";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Container as Cont, Carousel, CarouselItem, Button } from "react-bootstrap";
import Loading from "@components/loading/Loading";
import Category from "@models/Category";
import { useNavigate } from "react-router-dom";
import './homepage.scss';

interface IHomePageProps {

}

const HomePage: React.FC<IHomePageProps> = observer(function HomePage(props: IHomePageProps) {

    return (
        <Container style={{textAlign: "center" }}>
            <SelectedProductItems />
            <SelectedCategories />
        </Container>
    );
});

export default HomePage;

export const SelectedProductItems = () => {
    const { productStore } = useContext(MobXContext);
    if(productStore.ProductItems) {


    console.log(toJS(productStore.ProductItems))

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
        <Cont>
            <Carousel className="CarouselFrontpage" fade onSlide={handleSlide}>
                {productStore.ProductItems.map((product) => (
                    <CarouselItem key={product.id}>
                        <div style={{textAlign: 'center'}}>
                            <img className="CarouselItemImg"
                                src={product.images[0]}
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
                                    {product.price} DKK
                                </Typography>
                                <div className="CarouselItemBtnDiv">
                                    <Button>
                                        View Product
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
        </Cont>
    )}
    else {
        return <Loading />
    }
}

{/* <Carousel>
{productStore.ProductItems.map((product) => (
    <CarouselItem key={product.id}>
        <Card sx={{ maxWidth: "60rem" }}>
            <CardMedia component="img" height="140" src={product.images[0]}/>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {product.product.name}
            </Typography>
            <Button variant="contained">Shop Now</Button>
            </CardContent>
        </Card>
    </CarouselItem>
))}
</Carousel> */}

export const SelectedCategories = () => {
    
    const { categoryStore, languageStore } = useContext(MobXContext);

    const navigate = useNavigate();

    function handleClick(category: Category, name : string) {
        navigate('/subcategories/' + category.id , { state: { name} })
    }

    if(categoryStore.Categories)
    return (
        <Box sx={{ bgcolor: "background.paper", py: 8 }}>
            <Container maxWidth="lg">
                <Typography variant="h5" align="left" gutterBottom>
                    Udvalgte Kategorier
                </Typography>
                <hr />
                <Grid container columnSpacing={0} rowSpacing={2} style={{ textAlign: "center" }}>
                    {categoryStore.Categories.map((category) => (
                    <Grid item key={category.id} xs={12} sm={6} md={4}>
                        <Card className="GridCategoryCard" sx={{ maxWidth: 345 }} onClick={() => handleClick(category, category.name)}>
                        <CardMedia component="img" height="140" src={category.imageUrl} />
                        <CardContent>
                            <Typography variant="h5" >
                            {languageStore.getCurrentLanguageCode() === "da_DK" ? category.name.split("|")[0] : category.name.split("|")[1]}
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
    else {
        return <Loading />
    }
}