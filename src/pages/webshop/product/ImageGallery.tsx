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

  const images : Array<string> = props.imageURLs;
  let order: Array<number> = [0, 1 , 2 , 3 ,4]
 
  function rearangeOrder(index : number){
   const val = order[index];
    // Remove the value from its current position
    order.splice(index, 1);
    // Add the value at the beginning of the array
    order.unshift(val);
    return order
  }

  function setImages(order : Array<number>, images : Array<string>){
    let i = 0; 
    order.forEach(element => {
      setMainImage(images[i]);
    });
  }

  
  
  return (
    <div className="image-gallery">
      <table>
      <tbody>
        <tr>
          <th style={{ width: '12.5%' }}>
           
            <Image src={image1} key={"1productImgGalSelImg"} fluid className="big-image" />
            <Image src={image2} key={"2productImgGalSelImg"} fluid className="big-image" />
            <Image src={image3} key={"3productImgGalSelImg"} fluid className="big-image" />
            <Image src={image4} key={"4productImgGalSelImg"} fluid className="big-image" />
          </th>
          <th style={{ width: '37.5%' }}>
            <Image src={mainImage} key={"1productImgGalSelImg"} fluid className="big-image" />
          </th>
        </tr>
      </tbody>
    </table>

      {/* <div className="small-images">
        {props.imageURLs.map((url, index) => (
          <div key={index}>
            <Image src={url} thumbnail onClick={() => setMainImage(url)} />
          </div>
        ))}
      </div> */}
    </div>
  )

});
export default ImageGallery;

