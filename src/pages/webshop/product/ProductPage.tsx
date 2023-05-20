import { observer } from "mobx-react-lite"
import { useContext, useState } from "react";
import MobXContext from "@stores/MobXContext";
import { useParams } from "react-router-dom";
import ProductDescription from "./ProductDescription";
import { Button, Grid, ImageList, ImageListItem } from "@mui/material";

const ProductPage: React.FC = observer(() => {

  const { webshopStore, basketStore, languageStore } = useContext(MobXContext);

  let { id } = useParams();
  const product = (webshopStore.getProductItem(Number(id)));
  function handleClick() { basketStore.addToBasket(product); }
  const imageUrlArray: string[] = product.images.map(i => i.url);
  const [largeImageUrl, setLargeImageUrl] = useState(imageUrlArray[0]);
  const smallImageSize = 120;


  if (product) {
    return (
      <Grid container margin={'auto'} spacing={2} sx={{ maxWidth: '1000px' }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} display={'flex'} flexDirection={'row'}>
          <Grid item xs={3} >
            <ImageList cols={1} rowHeight={smallImageSize} sx={{ paddingX: '10px' }}>
              {imageUrlArray.map((item) => (
                <ImageListItem
                  key={"imageListItem" + item}
                  sx={{
                    transition: "box-shadow 0.2s ease-in-out",
                    '&:hover': {
                      cursor: "pointer",
                      transform: "scale(1.1)"
                    }
                  }}>
                  <img
                    src={`${item}?w="${smallImageSize}"&h="${smallImageSize}"fit=crop&auto=format`}
                    srcSet={`${item}?w="${smallImageSize}"&h="${smallImageSize}"&fit=crop&auto=format`}
                    alt={item}
                    style={{ width: smallImageSize, height: smallImageSize, alignSelf: "center", border:"none"}}
                    loading="lazy"

                    onClick={() => setLargeImageUrl(item)}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <Grid item xs={9} >
            <img
              style={{ display: 'flex', maxWidth: '100%', maxHeight: '100%' }}
              src={`${largeImageUrl}?w=300&h=250&fit=crop&auto=format`}
              alt={largeImageUrl}
            />

          </Grid>
        </Grid>


        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
          <Grid item xs={12} display={'flex'} justifyContent={'start'} >
            <ProductDescription key={"productDes" + product.id} product={product} />
          </Grid>

          <Grid item xs={12} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}  >
            <Grid item xs={12} display={'flex'} alignItems={'end'}>
            </Grid>
            <Grid item xs={12} display={'flex'} alignItems={'start'}>
              <Button variant="contained" onClick={() => handleClick()} sx={{ width: '12rem', maxHeight: '4rem', minHeight: '3rem', marginY: '10px' }}>{languageStore.currentLanguage.addToBasket}</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

});

export default ProductPage;