import { Tooltip } from "antd";
import Image from "next/image";

const MansoryCard = ({ data, callback }) => {
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
            {/* <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            > */}
            {/* <Image
                alt={image.image}
                src={image.image}
                layout="fill"
                objectFit="contain"
                priority={true}
                unoptimized
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105 rounded-lg"
              />
            </div>

            <Image
              src={image.image}
              alt="Category Image"
              placeholder={image.image}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105 rounded-lg"
              priority={true}
              unoptimized
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            /> */}
            {/* <Image
              loader={({ src }) => `${src}?w=500&q=75`}
              // priority={true}
              // unoptimized
              src={image.image}
              alt={image.title}
              title=""
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="cover"
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105 rounded-lg"
            /> */}

            <img
              src={image.image}
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
