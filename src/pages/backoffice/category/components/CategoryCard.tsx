import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Category from '@models/Category';
import MobXContext, { IMobXContext } from '@stores/MobXContext';
import { useContext } from 'react';
import { Delete, Edit, FiberManualRecord } from "@mui/icons-material";

export interface ICategoryCardProps {
    category: Category;
    goToSubcategories: (category: Category) => void;
    updateCategory: (category: Category) => void;
    deleteCategory: (category: Category) => Promise<void>;
}

const CategoryCard: React.FC<ICategoryCardProps> = function CategoryCard(props: ICategoryCardProps) {

    const { subCategoryStore, languageStore } = useContext<IMobXContext>(MobXContext);
    const subcategoryCount: number = subCategoryStore.subCategoriesByCategoryID(props.category.id) ? subCategoryStore.subCategoriesByCategoryID(props.category.id).length : 0;
    const subcategoryCountTitle: string = subcategoryCount + " " + languageStore.currentLanguage.SubCategoriesTabText.toLowerCase();

    const onImageClicked = () => {
        props.goToSubcategories(props.category);
    }

    const onUpdateIconClicked = () => {
        props.updateCategory(props.category)
    }

    const onDeleteIconClicked = () => {
        props.deleteCategory(props.category)
    }

    return (
        <Card sx={{ width: '300px' }}>
            <CardHeader
                avatar={<FiberManualRecord sx={{ color: 'green' }} />}
                action={
                    <IconButton onClick={onDeleteIconClicked} aria-label="delete">
                        <Delete />
                    </IconButton>
                }
                title={<FiberManualRecord sx={{ color: 'green' }} /> && 'Active on website'}
            >
                <FiberManualRecord sx={{ color: 'green' }} /> Active on website'
            </CardHeader>
            <CardMedia
                component="img"
                height={200}
                onClick={onImageClicked}
                image={props.category.imageUrl ? props.category.imageUrl : "https://picsum.photos/200/300?grayscale"}
                alt="Category image for category card"
                style={{ objectFit: "cover" }}
            />
            <CardContent>
                <Typography variant="h3" color="text.primary" sx={{ maxHeight: '40px', overflow: 'hidden' }}>
                    {props.category.name.split('|')[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {subcategoryCountTitle}
                </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
                <IconButton onClick={onUpdateIconClicked} aria-label="edit">
                    <Edit />
                </IconButton>


            </CardActions>
        </Card>
    );
}

export default CategoryCard;


// <CardHeader
//                 avatar={
//                     <Avatar>
//                         {props.category.order ? props.category.order : ''}
//                     </Avatar>
//                 }

                    // <IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    // </IconButton>