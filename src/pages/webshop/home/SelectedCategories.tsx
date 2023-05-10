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
        navigate('categories/subcategories/' + category.id, { state: { name } })
    }

    if (webshopStore.Categories)
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h5" align="left" gutterBottom>
                    {languageStore.currentLanguage.chosenCategories}
                </Typography>
                <hr />
                <Grid container display={'flex'} justifyContent={'center'} spacing={4} >
                    {webshopStore.Categories.slice(0, 6).map((category) => (
                        <Grid item key={category.id} xs={12} sm={6} md={4} lg={4} xl={4} display={'flex'}>
                            <Card sx={{
                                width: '100%',
                                textAlign: 'center',
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                                transition: "box-shadow 0.2s ease-in-out",
                                '&:hover': {
                                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.6)",
                                    cursor: "pointer"
                                }
                            }}
                                onClick={() => handleClick(category, category.name)}>
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
        )
    else {
        return <Loading />
    }
});