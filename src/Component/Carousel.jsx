import { useState } from 'react';
import img1 from '../img/afabg.png'
import img2 from '../img/icon1.png'
import img3 from '../img/afa champion.jpg'
import img4 from '../img/afa u12.jpg'

const ImageCarousel = () => {
  const images = [
    img1,
    img2,
    img3,
    img4
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
        onClick={prevSlide}
      >
        ❮
      </button>
      <div className="overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-auto transition-opacity duration-500 ease-in-out"
        />
      </div>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
        onClick={nextSlide}
      >
        ❯
      </button>
    </div>
  );
};

export default ImageCarousel;
