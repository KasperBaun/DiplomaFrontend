import ProductItemWEB from '@models/webShop/ProductItemWEB';
import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
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
        images,
    } = props.data;

    return (
        <Card
          style={{
            width: 400,
            margin: "16px",
            borderRadius: 8,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={images[0] || "https://www.transactis.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png"} // assuming the first URL in the array is the main image
            alt={name}
            style={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {name}
            </Typography>
            <Typography color="textSecondary">
              Model Number: {modelNumber}
            </Typography>
            <Divider style={{ margin: "8px 0", backgroundColor: "black" }} variant="middle" />
            <Typography color="textPrimary" >Price: {price}</Typography>
            <Typography color="textSecondary">Condition: {condition}</Typography>
            <Typography color="textSecondary">Quality: {quality}</Typography>
          </CardContent>
        </Card>
      );
    };

export default MyCard;