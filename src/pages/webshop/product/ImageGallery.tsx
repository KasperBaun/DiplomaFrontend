import { observer } from "mobx-react-lite";
import { Image } from 'react-bootstrap';
import React, { useState } from 'react';

interface IImageGalleryProps {
  imageURLs: string[];
}

const ImageGallery: React.FC<IImageGalleryProps> = observer(function ImageGallery(props: IImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(props.imageURLs[0] || "https://www.transactis.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png");

  return (

    <div className="image-gallery">
      <Image src={selectedImage} key={"productImgGalSelImg"} fluid className="big-image" />
      <div className="small-images">
        {props.imageURLs.map((url, index) => (
          <div key={index}>
            <Image src={url} thumbnail onClick={() => setSelectedImage(url)} />
          </div>
        ))}
      </div>
    </div>
  )

});
export default ImageGallery;

