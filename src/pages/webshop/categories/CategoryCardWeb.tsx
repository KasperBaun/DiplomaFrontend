import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Category from '@models/Category';
import MobXContext, { IMobXContext } from '@stores/MobXContext';
import { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Translater } from "utils/Translater"
    ;
export type CategoryCardProps = {
    category: Category;
    type: String;
}

const CategoryCardWeb: React.FC<CategoryCardProps> = observer(function CategoryCard(props: CategoryCardProps) {

    const { webshopStore, languageStore } = useContext<IMobXContext>(MobXContext);
    const subcategoryCount: number = webshopStore.subCategoriesByCategoryID(props.category.id) ? webshopStore.subCategoriesByCategoryID(props.category.id).length : 0;
    const subcategoryCountTitle: string = subcategoryCount + " " + languageStore.currentLanguage.SubCategoriesTabText.toLowerCase();
    const translater = new Translater();

    if (props.type === "cat") {
        return (
            <Card sx={{ width: '300px' }}>
                <CardHeader>
                </CardHeader>
                <CardMedia
                    component="img"
                    height={200}
                    onClick={() => translater.getCategoryBasedOnLanguage(languageStore, props.category.name)}
                    image={props.category.imageUrl ? props.category.imageUrl : "https://picsum.photos/200/300?grayscale"}
                    alt="Category image for category card"
                />
                <CardContent>
                    <Typography variant="h4" color="text.primary">
                        {translater.getCategoryBasedOnLanguage(languageStore, props.category.name)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {subcategoryCountTitle}
                    </Typography>
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
                </CardActions>
            </Card>
        );
    }

    else if (props.type === "subCat") {
        return (
            <Card sx={{ width: '300px' }}>
                <CardHeader>
                </CardHeader>
                <CardMedia
                    component="img"
                    height={200}
                    onClick={() => translater.getCategoryBasedOnLanguage(languageStore, props.category.name)}
                    image={props.category.imageUrl ? props.category.imageUrl : "https://picsum.photos/200/300?grayscale"}
                    alt="Category image for category card"
                />
                <CardContent>
                    <Typography variant="h5" color="text.primary">
                        {translater.getCategoryBasedOnLanguage(languageStore, props.category.name)}
                    </Typography>
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'end' }}>


                </CardActions>
            </Card>
        );
    }


});
export default CategoryCardWeb;
