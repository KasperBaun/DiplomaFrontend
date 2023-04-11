import { observer } from "mobx-react-lite";
import { Image } from 'react-bootstrap';
import React, { useState } from 'react';

interface IImageGalleryProps {
  imageURLs: string[];
}

const ImageGallery: React.FC<IImageGalleryProps> = observer(function ImageGallery(props: IImageGalleryProps) {
  const [mainImage, setMainImage] = useState(props.imageURLs[0] || "https://static.wixstatic.com/media/c38ac4_7920cfe5a47843db9631961ac4f80a3d~mv2.jpeg/v1/fill/w_315,h_420,al_c,q_85,usm_0.66_1.00_0.01/c38ac4_7920cfe5a47843db9631961ac4f80a3d~mv2.webp");
  const image1 = (props.imageURLs[1] || "https://static.wixstatic.com/media/c38ac4_7920cfe5a47843db9631961ac4f80a3d~mv2.jpeg/v1/fill/w_315,h_420,al_c,q_85,usm_0.66_1.00_0.01/c38ac4_7920cfe5a47843db9631961ac4f80a3d~mv2.webp");
  const image2 = (props.imageURLs[2] || "https://static.wixstatic.com/media/c38ac4_f00775c3541f485a94425e807fc682b4~mv2.jpeg/v1/fill/w_315,h_420,al_c,q_85,usm_0.66_1.00_0.01/c38ac4_f00775c3541f485a94425e807fc682b4~mv2.webp");
  const image3 = (props.imageURLs[3] || "https://static.wixstatic.com/media/c38ac4_35a57731a617411a834f11603fc565ea~mv2.jpeg/v1/fill/w_315,h_420,al_c,q_85,usm_0.66_1.00_0.01/c38ac4_35a57731a617411a834f11603fc565ea~mv2.webp");
  const image4 = (props.imageURLs[4] || "https://static.wixstatic.com/media/c38ac4_a5c77572fd204b8a96d6426a438209bb~mv2.jpeg/v1/fill/w_315,h_420,al_c,q_85,usm_0.66_1.00_0.01/c38ac4_a5c77572fd204b8a96d6426a438209bb~mv2.webp");

  const tempImages : Array<string> = [mainImage, image1, image2, image3, image4]
 
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
const [image2Clicked, setImage2Clicked]  = useState(false);
const [image3Clicked, setImage3Clicked]  = useState(false);
const [image4Clicked, setImage4Clicked]  = useState(false);

  function handleClick(pictureNumber : number) {
    switch(pictureNumber){
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
    <div className="image-gallery">
      <table>
      <tbody>
        <tr>
          <th style={{ width: '10%'}}>
            <div>
            <Image src={image1} key={"1productImgGalSelImg"} onClick={() => handleClick(1) } fluid className={image1Clicked ? "small-images clicked" : "small-images"}/>
            <Image src={image2} key={"2productImgGalSelImg"} onClick={() => handleClick(2) } fluid className={image2Clicked  ? "small-images clicked" : "small-images"} />
            <Image src={image3} key={"3productImgGalSelImg"} onClick={() => handleClick(3) } fluid className={image3Clicked  ? "small-images clicked" : "small-images"} />
            <Image src={image4} key={"4productImgGalSelImg"} onClick={() => handleClick(4) } fluid className={image4Clicked  ? "small-images clicked" : "small-images"} />
            </div>
          </th>
          <th style={{ width: '40%', textAlign: 'center'}}>
            <Image src={mainImage} key={"MainproductImgGalSelImg"} fluid className="big-image" />
          </th>
        </tr>
      </tbody>
    </table>
    </div>
  )

});
export default ImageGallery;

