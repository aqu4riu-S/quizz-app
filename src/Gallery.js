import GalleryItem from "./GalleryItem";

export default function Gallery({ galleryLst }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {galleryLst.map((itemObj, index) => (
        <GalleryItem
          src={itemObj.source}
          alt={itemObj.altText}
          text={itemObj.course}
          key={index}
        />
      ))}
    </div>
  );
}
