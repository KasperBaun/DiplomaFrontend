import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import Category from "@models/Category";
import { useNavigate } from "react-router-dom";
import Loading from "@components/loading/Loading";

export const SelectedCategories = observer(function SelectedCategories() {

    const { webshopStore, languageStore } = useContext(MobXContext);
    const navigate = useNavigate();

    function handleClick(category: Category, name: string) {
        navigate('/subcategories/' + category.id, { state: { name } })
    }

    if (webshopStore.Categories)
        return (
            <Box sx={{ bgcolor: "background.paper", py: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h5" align="left" gutterBottom>
                        {languageStore.currentLanguage.chosenCategories}
                    </Typography>
                    <hr />
                    <Grid container columnSpacing={0} rowSpacing={2} style={{ textAlign: "center" }}>
                        {webshopStore.Categories.slice(0, 6).map((category) => (
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
});