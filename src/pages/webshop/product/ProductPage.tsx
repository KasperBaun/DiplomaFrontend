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
  const smallImageSize = 164;


  if (product) {
    return (
      <Grid container margin={'auto'} spacing={2} sx={{ maxWidth: '1000px' }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <img
            style={{ display: 'flex', maxWidth: '100%', maxHeight: '100%' }}
            src={`${largeImageUrl}?w=300&h=250&fit=crop&auto=format`}
            alt={largeImageUrl}
          />

        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
          <ProductDescription source={"web"} key={"productDes" + product.id} product={product} />
          <Button variant="outlined" onClick={() => handleClick()} sx={{ width: '12rem', minHeight: '3rem', marginY: '10px' }}>{languageStore.currentLanguage.addToBasket}</Button>
          <ImageList cols={4} rowHeight={smallImageSize} sx={{}}>
            {imageUrlArray.map((item) => (
              <ImageListItem key={"imageListItem" + item}>
                <img
                  src={`${item}?w=${smallImageSize}&h=${smallImageSize}fit=crop&auto=format`}
                  srcSet={`${item}?w=${smallImageSize}&h=${smallImageSize}&fit=crop&auto=format&dpr=2 2x`}
                  alt={item}
                  loading="lazy"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setLargeImageUrl(item)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    );
  }

});

export default ProductPage;