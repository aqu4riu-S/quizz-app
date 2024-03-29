import GalleryItem from "./GalleryItem";

export default function Gallery({ galleryLst }) {
  return (
    <div className="bg-white w-1/2 text-black rounded-xl px-10 py-12">
      <h1 className="text-2xl text-center mb-8">Selecionar Temas</h1>
      <div className="grid grid-cols-3 gap-4">
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
