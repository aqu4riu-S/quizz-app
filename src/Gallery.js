import GalleryItem from "./GalleryItem";

export default function Gallery({ galleryLst }) {
  return (
    <div className="bg-white text-black rounded-xl p-8">
      <h1 className="text-2xl mb-6">Selecionar temas:</h1>
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
    </div>
  );
}
