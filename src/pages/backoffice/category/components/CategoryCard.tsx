import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Category from '@models/Category';
import MobXContext, { IMobXContext } from '@stores/MobXContext';
import { useContext } from 'react';
import { Delete, Edit } from "@mui/icons-material";

export interface ICategoryCardProps {
    category: Category;
    updateCategory: (category: Category) => void;
    deleteCategory: (category: Category) => Promise<void>;
}

const CategoryCard: React.FC<ICategoryCardProps> = function CategoryCard(props: ICategoryCardProps) {

    const { subCategoryStore, languageStore } = useContext<IMobXContext>(MobXContext);
    const subcategoryCount: number = subCategoryStore.subCategoriesByCategoryID(props.category.id) ? subCategoryStore.subCategoriesByCategoryID(props.category.id).length : 0;
    const subcategoryCountTitle: string = subcategoryCount + " " + languageStore.currentLanguage.SubCategoriesTabText.toLowerCase();

    return (
        <Card sx={{ width: '300px' }}>
            <CardHeader
                avatar={
                    <Avatar>
                        {props.category.order ? props.category.order : ''}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.category.name}
                subheader={subcategoryCountTitle}
            />
            <CardMedia
                component="img"
                height={200}

                image={props.category.imageUrl ? props.category.imageUrl : "https://picsum.photos/200/300?grayscale"}
                alt="Category image for category card"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {/* TODO - decide if we should have this functionality */}
                    Active on website
                </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton onClick={() => props.updateCategory(props.category)} aria-label="edit">
                    <Edit />
                </IconButton>
                <IconButton onClick={() => props.deleteCategory(props.category)} aria-label="delete">
                    <Delete />
                </IconButton>

            </CardActions>
        </Card>
    );
}

export default CategoryCard;