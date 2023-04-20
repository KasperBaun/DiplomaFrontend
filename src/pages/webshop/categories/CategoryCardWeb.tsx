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
import { observer } from "mobx-react-lite"

export interface ICategoryCardProps {
    category: Category;
}

const CategoryCardWeb: React.FC<ICategoryCardProps> = observer(function CategoryCard(props: ICategoryCardProps) {

    const { subCategoryStore, languageStore } = useContext<IMobXContext>(MobXContext);
    const subcategoryCount: number = subCategoryStore.subCategoriesByCategoryID(props.category.id) ? subCategoryStore.subCategoriesByCategoryID(props.category.id).length : 0;
    const subcategoryCountTitle: string = subcategoryCount + " " + languageStore.currentLanguage.SubCategoriesTabText.toLowerCase();


    function getCategoryBasedOnLanguage(){        
        const splitIndex = props.category.name.indexOf('|');

        if (languageStore.getcurrentLanguageCode() === "da_DK"){
           let nameval = props.category.name.slice(0, splitIndex);
           return nameval;
        }
        else {
            let nameval = props.category.name.slice(splitIndex+1, props.category.name.length+1);
            return nameval;
        }
    }

    return (
        <Card sx={{ width: '300px' }}>
            <CardHeader>
            </CardHeader>
            <CardMedia
                component="img"
                height={200}
                onClick={()=>getCategoryBasedOnLanguage()}
                image={props.category.imageUrl ? props.category.imageUrl : "https://picsum.photos/200/300?grayscale"}
                alt="Category image for category card"
            />
            <CardContent>
                <Typography variant="h4" color="text.primary">
                    {getCategoryBasedOnLanguage()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {subcategoryCountTitle}
                </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
    

            </CardActions>
        </Card>
    );
});
export default CategoryCardWeb;
