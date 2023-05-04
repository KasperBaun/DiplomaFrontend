import { ProductItemWeb } from '@models/ProductItemWeb';
import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import MobXContext from '@stores/MobXContext';
import React, { useContext } from 'react';
import { useState } from "react";

type ProductCardWebProps = {
  data: ProductItemWeb;
}

export const ProductCardWeb: React.FC<ProductCardWebProps> = function MyCard(props: ProductCardWebProps) {

  const productItem = props.data;
  const { languageStore } = useContext(MobXContext);

  const [cardStyle, setCardStyle] = useState({
    width: 300,
    margin: "12px",
    borderRadius: 8,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "box-shadow 0.2s ease-in-out",
  });

  const hoverCardStyle = {
    ...cardStyle,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.6)",
  };

  const originalStyle = {
    ...cardStyle,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
  }

  return (
    <Card
      style={cardStyle}
      onMouseOver={() => {
        setCardStyle(hoverCardStyle);
      }}
      onMouseOut={() => {
        setCardStyle(originalStyle);
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={productItem.images[0].url || "https://www.transactis.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png"} // assuming the first URL in the array is the main image
        alt={productItem.product.name}
        style={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.data.product.name}
        </Typography>
        <Typography color="textSecondary">
          Model Number: {props.data.product.modelNumber}
        </Typography>
        <Divider style={{ margin: "8px 0", backgroundColor: "black" }} variant="middle" />
        <Typography color="textPrimary">{languageStore.currentLanguage.price}: {productItem.currentPrice} DKK</Typography>
        <Typography color="textSecondary"> {languageStore.currentLanguage.getQuality(productItem.condition)}</Typography>
        <Typography color="textSecondary">{languageStore.currentLanguage.getQuality(productItem.quality)}</Typography>
      </CardContent>
    </Card>
  );
};
