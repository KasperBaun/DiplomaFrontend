import SubCategory from "@models/SubCategory";
import { Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { Translater } from "@utils/Translater";
import { useContext } from "react";

export type SubcategoryCardProps = {
    subcategory: SubCategory;
    onCardClicked?: (subcategoryId: number) => void;
}

export const SubcategoryCard: React.FC<SubcategoryCardProps> = function SubcategoryCard(props: SubcategoryCardProps) {

    const { subcategory, onCardClicked } = props;
    const { languageStore } = useContext<IMobXContext>(MobXContext);
    const translater = new Translater();
    const handleOnCardClicked = () => {
        onCardClicked(props.subcategory.id);
    }

    return (
        <Card sx={{ width: '300px' }} onClick={handleOnCardClicked}>
            <CardHeader>
            </CardHeader>
            <CardMedia
                component="img"
                height={200}
                onClick={() => translater.getCategoryBasedOnLanguage(languageStore, subcategory.name)}
                image={subcategory.imageUrl ? subcategory.imageUrl : "https://picsum.photos/200/300?grayscale"}
                alt="Category image for category card"
            />
            <CardContent>
                <Typography variant="h5" color="text.primary">
                    {translater.getCategoryBasedOnLanguage(languageStore, subcategory.name)}
                </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
            </CardActions>
        </Card>
    );
}