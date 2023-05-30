import { ProductItemWeb } from '@models/ProductItemWeb';
import { Card, CardActionArea, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material';
import MobXContext from '@stores/MobXContext';
import { ExtentionMethods } from '@utils/ExtentionMethods';
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
    minHeight: 375,
    margin: "12px",
    borderRadius: 8,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "box-shadow 0.2s ease-in-out",
  });

  const hoverCardStyle = {
    ...cardStyle,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.6)",
    cursor: "pointer"
  };

  const originalStyle = {
    ...cardStyle,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
  }

  const slicedName = productItem.product.name.length > 28 ? productItem.product.name.slice(0, 28) + "..." : productItem.product.name;
  const conditionText = languageStore.currentLanguage.getCondition(productItem.condition) !== "" ? languageStore.currentLanguage.getCondition(productItem.condition) : null;
  const qualityText = languageStore.currentLanguage.getQuality(productItem.quality) !== "" ? languageStore.currentLanguage.getQuality(productItem.quality) : null;

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
        <Grid container display={'flex'}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h2">
              {slicedName}
            </Typography>
            <Divider style={{ margin: "8px 0", backgroundColor: "black" }} variant="middle" />
          </Grid>

          <Grid item xs={12}>
            {conditionText && <Typography color="textPrimary"><b>{languageStore.currentLanguage.condition}:</b> {languageStore.currentLanguage.getCondition(productItem.condition)}</Typography>}
            {qualityText && <Typography color="textPrimary"><b>{languageStore.currentLanguage.quality}:</b> {languageStore.currentLanguage.getQuality(productItem.quality)}</Typography>}
            <Typography color="textPrimary"> <b>{languageStore.currentLanguage.modelNumber}:</b> {props.data.product.modelNumber}</Typography>
          </Grid>


        </Grid>


      </CardContent>
      <CardActionArea >
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
          <Typography variant="h4" color="primaryText">
            <b>{languageStore.currentLanguage.price}:</b> { ExtentionMethods.formatPrice(productItem.currentPrice, languageStore.getCurrentLanguageCode(), languageStore.getCurrency())}
          </Typography>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
