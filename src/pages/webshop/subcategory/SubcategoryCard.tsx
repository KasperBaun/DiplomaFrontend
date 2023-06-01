import { SubCategory } from "@models/SubCategory";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { Translater } from "@utils/Translater";
import { useContext } from "react";

type SubcategoryCardProps = {
    subcategory: SubCategory;
    onCardClicked?: (subcategoryId: number) => void;
}

export const SubcategoryCard: React.FC<SubcategoryCardProps> = (props: SubcategoryCardProps) => {

    const { subcategory, onCardClicked } = props;
    const { languageStore, webshopStore } = useContext<IMobXContext>(MobXContext);
    const translater = new Translater();
    const handleOnCardClicked = () => {

        if (subcategoryProductsCount > 0 ){

            onCardClicked(props.subcategory.id);
        }
        else alert(languageStore.currentLanguage.alertNoProuductsInCat); 
    }
    const subcategoryProductsCount: number = webshopStore.getProductItemsInSubcategory(subcategory.id) ? webshopStore.getProductItemsInSubcategory(subcategory.id).length : 0;
    const productsText: string = subcategoryProductsCount === 1 ? languageStore.currentLanguage.product.toLowerCase() : languageStore.currentLanguage.products.toLowerCase();
    const subcategoryProductsCountTitle: string = subcategoryProductsCount + " " + productsText;
    
    return (
        <Card sx={{
            width: '300px',
            maxHeight: '300px',
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "box-shadow 0.2s ease-in-out",
            '&:hover': {
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.6)",
                cursor: "pointer"
            },
            ...(subcategoryProductsCount === 0 && { filter: 'grayscale(100%)' }) // Add greyfilter if there is no products
        }} onClick={handleOnCardClicked}>

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