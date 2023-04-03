import { observer } from "mobx-react-lite";
import { Image } from 'react-bootstrap';
import React, { useState } from 'react';

interface IImageGalleryProps {
  imageURLs: string[];
}

const ImageGallery: React.FC<IImageGalleryProps> = observer(function ImageGallery(props: IImageGalleryProps) {
  const [mainImage, setMainImage] = useState(props.imageURLs[0] || "https://www.transactis.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png");
  const [image1, setImage1] = useState(props.imageURLs[1] || "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Un1.svg/1200px-Un1.svg.png");
  const [image2, setImage2] = useState(props.imageURLs[2] || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Deux.svg/1024px-Deux.svg.png");
  const [image3, setImage3] = useState(props.imageURLs[3] || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Trois.svg/1024px-Trois.svg.png");
  const [image4, setImage4] = useState(props.imageURLs[4] || "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Quatre.svg/1024px-Quatre.svg.png");

  const tempImages : Array<string> = [mainImage, image1, image2, image3, image4]
 
  function rearangeOrder(index : number){
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
  }

  function handleClick(pictureNumber : number) {
  console.log(tempImages);
   rearangeOrder(pictureNumber);
   console.log(tempImages);
  setImages(tempImages);
}

  

  
  
  return (
    <div className="image-gallery">
      <table>
      <tbody>
        <tr>
          <th style={{ width: '12.5%', textAlign: 'center'}}>
            <div>
            <Image src={image1} key={"1productImgGalSelImg"} onClick={() => handleClick(1) } fluid className="small-images" />
            <Image src={image2} key={"2productImgGalSelImg"} onClick={() => handleClick(2) } fluid className="small-images" />
            <Image src={image3} key={"3productImgGalSelImg"} onClick={() => handleClick(3) } fluid className="small-images" />
            <Image src={image4} key={"4productImgGalSelImg"} onClick={() => handleClick(4) } fluid className="small-images" />
            </div>
          </th>
          <th style={{ width: '37.5%', textAlign: 'center'}}>
            <Image src={mainImage} key={"MainproductImgGalSelImg"} fluid className="big-image" />
          </th>
        </tr>
      </tbody>
    </table>
    </div>
  )

});
export default ImageGallery;

