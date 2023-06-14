import { observer } from "mobx-react-lite"
import React, { useContext, useState } from "react";
import MobXContext from "@stores/MobXContext";
import { useParams } from "react-router-dom";
import ProductDescription from "./ProductDescription";
import { Button, Grid, ImageList, ImageListItem } from "@mui/material";

export const ProductPage: React.FC = observer(() => {

  const { webshopStore, basketStore, languageStore } = useContext(MobXContext);

  let { id } = useParams();
  const product = (webshopStore.getProductItem(Number(id)));
  function handleClick() { basketStore.addToBasket(product, languageStore); }
  let imageUrlArray: string[] = product.images.map(i => i.url);
  const [largeImageUrl, setLargeImageUrl] = useState(imageUrlArray[0]);

  const smallImageStyling: React.CSSProperties = {
    borderRadius: '5px',
    transition: "box-shadow 0.2s ease-in-out",
    maxWidth: "33%",
    maxHeight: "33%"
  }
  const selectedSmallImageStyling: React.CSSProperties = {
    ...smallImageStyling,
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.6)"
  }


  if (product) {

    // var matchingProductItems = webshopStore.ProductItems.filter(p =>
    //   p.product.subcategories.some(subcategory =>
    //     product.product.subcategories.map(sub => sub.id).includes(subcategory.id)
    //   )
    // ).slice(0, 2);

    return (
      <Grid container >
        {/* Large and small images */}
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
          <Grid item display={'flex'} justifyContent={'center'}>
            <img
              style={{ display: 'flex', maxWidth: '100%', maxHeight: '100%', borderRadius: '5px' }}
              src={`${largeImageUrl}?w=300&h=250&fit=crop&auto=format`}
              alt={largeImageUrl}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                setLargeImageUrl( 'https://www.transactis.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png') // Error picture
              }}
            />
          </Grid>
          <Grid item display={'flex'} justifyContent={'center'}>
            <ImageList cols={6} sx={{ marginTop: 0, display: 'flex', padding: 3, borderRadius: '5px' }} >
              {imageUrlArray.map((item) => (
                <ImageListItem
                  key={"imageListItem" + item}
                  sx={
                    largeImageUrl === item ? {
                      ...selectedSmallImageStyling, '&:hover': {
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.6)",
                        cursor: "pointer"
                      }
                    } : {
                      ...smallImageStyling, '&:hover': {
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.6)",
                        cursor: "pointer"
                      }
                    }
                  }>
                  <img
                    src={`${item}?w=auto&h=auto&fit=crop&auto=format`}
                    srcSet={`${item}?w=auto&h=auto&fit=crop&auto=format`}
                    alt={item}
                    style={{ maxWidth: '100%', alignSelf: "center", border: "none", borderRadius: '5px' }}
                    loading="lazy"

                    onClick={() => setLargeImageUrl(item)}
                    
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} padding={1} >
          <Grid item  >
            <ProductDescription key={"productDes" + product.id} product={product} />
          </Grid>
          <Grid item sx={{ paddingTop: 6, display: 'flex', justifyContent: 'center' }} >
            <Button variant="contained" onClick={() => handleClick()} sx={{ width: '12rem', maxHeight: '4rem', minHeight: '3rem', marginY: '10px' }}>{languageStore.currentLanguage.addToBasket}</Button>
          </Grid>


        </Grid>

      </Grid >
    );
  }

});