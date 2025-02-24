import { Tooltip } from "antd";
import { useEffect, useState } from "react";

const MansoryCard = ({ data, callback }) => {
  const [cachedImages, setCachedImages] = useState({});

  useEffect(() => {
    const preloadImages = () => {
      data.forEach((image) => {
        const img = new Image();
        img.src = image.image;
        img.onload = () => {
          setCachedImages((prev) => ({
            ...prev,
            [image.image]: image.image,
          }));
        };
      });
    };
    preloadImages();
  }, [data]);

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
      {data.map((image, index) => (
        <Tooltip title="Click to view detail" key={index}>
          <div
            onClick={() => {
              callback(image);
            }}
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer break-inside-avoid"
          >
            <img
              src={cachedImages[image.image] || image.image}
              alt={image.title}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105 rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
              <h3 className="text-lg font-bold">{image.title}</h3>
              <p className="text-sm mt-1">{image.description}</p>
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default MansoryCard;
