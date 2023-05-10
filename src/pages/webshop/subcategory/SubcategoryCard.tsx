import SubCategory from "@models/SubCategory";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { Translater } from "@utils/Translater";
import { useContext } from "react";

export type SubcategoryCardProps = {
    subcategory: SubCategory;
    onCardClicked?: (subcategoryId: number) => void;
}

export const SubcategoryCard: React.FC<SubcategoryCardProps> = function SubcategoryCard(props: SubcategoryCardProps) {

    const { subcategory, onCardClicked } = props;
    const { languageStore, webshopStore } = useContext<IMobXContext>(MobXContext);
    const translater = new Translater();
    const handleOnCardClicked = () => {
        onCardClicked(props.subcategory.id);
    }
    const subcategoryProductsCount: number = webshopStore.getProductItemsInSubcategory(subcategory.id) ? webshopStore.getProductItemsInSubcategory(subcategory.id).length : 0;
    const productsText: string = subcategoryProductsCount === 0 ? languageStore.currentLanguage.products.toLowerCase() : languageStore.currentLanguage.products.toLowerCase();
    const subcategoryProductsCountTitle: string = subcategoryProductsCount + " " + productsText;

    return (
        <Card sx={{ width: '300px' }} onClick={handleOnCardClicked}>

            <CardMedia
                component="img"
                height={200}
                onClick={() => translater.getCategoryBasedOnLanguage(languageStore, subcategory.name)}
                image={subcategory.imageUrl ? subcategory.imageUrl : "https://picsum.photos/200/300?grayscale"}
                alt={"Subcategory image for " + subcategory.name}
            />
            <CardContent >
                <Typography variant="h4">
                    {translater.getCategoryBasedOnLanguage(languageStore, subcategory.name)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {subcategoryProductsCountTitle}
                </Typography>
            </CardContent>

        </Card>
    );
}