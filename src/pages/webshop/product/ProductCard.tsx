import ProductItemWEB from '@models/webShop/ProductItemWEB';
import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

type ImageProps = {
    url: string;
};

const Image = ({ url }: ImageProps) => (
    <img
        style={{ maxWidth: '100%', maxHeight: '100%' }}
        src={url}
        alt="Product"
    />
);

export interface IMyCardProps {
    data: ProductItemWEB;
}


const MyCard: React.FC<IMyCardProps> = function MyCard(props: IMyCardProps) {
    const {
        id,
        price,
        createdDate,
        condition,
        quality,
        sold,
        weight,
        customText,
        product: {
            id: productId,
            name,
            modelNumber,
            material,
            design,
            dimension,
            subcategory: {
                id: subcategoryId,
                name: subcategoryName,
                category: {
                    id: categoryId,
                    name: categoryName,
                },
            },
        },
        imageUrls,
    } = props.data;

    return (
        <Card
            style={{
                width: 400,
                margin: '16px',
                borderRadius: 8,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            }}
        >
            <CardContent>
                <Typography variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography color="textSecondary">
                    ID: {id}
                </Typography>

                <Typography color="textSecondary">
                    Price: {price}
                </Typography>

                <Typography color="textSecondary">
                    Condition: {condition}
                </Typography>
                <Typography color="textSecondary">
                    Quality: {quality}
                </Typography>
                <Typography color="textSecondary">
                    Sold: {sold}
                </Typography>
                <Typography color="textSecondary">
                    Weight: {weight}
                </Typography>
                <Typography color="textSecondary">
                    Custom Text: {customText}
                </Typography>
                <Typography color="textSecondary">
                    Product ID: {productId}
                </Typography>
                <Typography color="textSecondary">
                    Model Number: {modelNumber}
                </Typography>
                <Typography color="textSecondary">
                    Material: {material}
                </Typography>
                <Typography color="textSecondary">
                    Design: {design}
                </Typography>
                <Typography color="textSecondary">
                    Dimension: {dimension}
                </Typography>
                <Typography color="textSecondary">
                    Subcategory ID: {subcategoryId}
                </Typography>
                <Typography color="textSecondary">
                    Subcategory Name: {subcategoryName}
                </Typography>
                <Typography color="textSecondary">
                    Category ID: {categoryId}
                </Typography>
                <Typography color="textSecondary">
                    Category Name: {categoryName}
                </Typography>
                <Typography color="textSecondary">
                    Images: {imageUrls ? imageUrls.join(', ') : "ChatGPT er dum"}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MyCard;