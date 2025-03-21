import { Tooltip } from "antd";

interface GalleryItem {
  id?: string;
  image: string;
  title: string;
  description: string;
}

interface MasonryCardProps {
  data: GalleryItem[];
  callback: (item: GalleryItem) => void;
}

const MansoryCard: React.FC<MasonryCardProps> = ({ data, callback }) => (
  <div className="columns-2 sm:columns-2 md:columns-3 gap-4 space-y-4">
    {data.map((item, index) => (
      <Tooltip title="Click to view detail" key={item.id || index}>
        <div
          onClick={() => callback(item)}
          className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer break-inside-avoid"
        >
          <img
            src={item.image}
            alt={item?.title || "Gallery Image"}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-105 rounded-lg"
          />
          {(item.title || item.description) && (
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
              {item.title && <h3 className="text-lg font-bold">{item.title}</h3>}
              {item.description && <p className="text-sm mt-1">{item.description}</p>}
            </div>
          )}
        </div>
      </Tooltip>
    ))}
  </div>
)

export default MansoryCard;
