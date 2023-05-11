import { observer } from "mobx-react-lite";
import { Image } from 'react-bootstrap';
import React, { useState } from 'react';
import { Grid } from "@mui/material";

interface IImageGalleryProps {
  imageURLs: string[];
}

const ImageGallery: React.FC<IImageGalleryProps> = observer(function ImageGallery(props: IImageGalleryProps) {
  const [mainImage, setMainImage] = useState(props.imageURLs[0]);
  const image1 = (props.imageURLs[0]);
  const image2 = (props.imageURLs[1]);
  const image3 = (props.imageURLs[2]);
  const image4 = (props.imageURLs[3]);

  const tempImages: Array<string> = [mainImage, image1, image2, image3, image4]

  // Outdated - not very intuative. 
  /* function rearangeOrder(index : number){
   const val = tempImages[index];
    // Remove the value from its current position
    tempImages.splice(index, 1);
    // Add the value at the beginning of the array
    tempImages.unshift(val);
    return tempImages
  }

  function setImages(images : Array<string>){
    setMainImage(images[0]);
    setImage1(images[1]);
    setImage2(images[2]);
    setImage3(images[3]);
    setImage4(images[4]);
  }*/

  const [image1Clicked, setImage1Clicked] = useState(true);
  const [image2Clicked, setImage2Clicked] = useState(false);
  const [image3Clicked, setImage3Clicked] = useState(false);
  const [image4Clicked, setImage4Clicked] = useState(false);

  function handleClick(pictureNumber: number) {
    switch (pictureNumber) {
      case 1:
        setImage1Clicked(true);
        setImage2Clicked(false);
        setImage3Clicked(false);
        setImage4Clicked(false);
        break;
      case 2:
        console.log("case2?")
        setImage1Clicked(false);
        setImage2Clicked(true);
        setImage3Clicked(false);
        setImage4Clicked(false);
        break;
      case 3:
        setImage1Clicked(false);
        setImage2Clicked(false);
        setImage3Clicked(true);
        setImage4Clicked(false);
        break;
      case 4:
        setImage1Clicked(false);
        setImage2Clicked(false);
        setImage3Clicked(false);
        setImage4Clicked(true);
        break;
    }
    setMainImage(tempImages[pictureNumber]);
  }


  return (
    <Grid container display={'flex'}>
      <Grid item lg={3}>
        <div className="small-images">
          <Image src={image1} key={"1productImgGalSelImg"} onClick={() => handleClick(1)} fluid className={image1Clicked ? "small-images clicked" : "small-images"} />
          <Image src={image2} key={"2productImgGalSelImg"} onClick={() => handleClick(2)} fluid className={image2Clicked ? "small-images clicked" : "small-images"} />
          <Image src={image3} key={"3productImgGalSelImg"} onClick={() => handleClick(3)} fluid className={image3Clicked ? "small-images clicked" : "small-images"} />
          <Image src={image4} key={"4productImgGalSelImg"} onClick={() => handleClick(4)} fluid className={image4Clicked ? "small-images clicked" : "small-images"} />
        </div>
      </Grid>
      <Grid item lg={9}>
        <div className="big-image">
          <Image src={mainImage} key={"MainproductImgGalSelImg"} fluid className="big-image" />
        </div>
      </Grid>
    </Grid>
  )

});
export default ImageGallery;

