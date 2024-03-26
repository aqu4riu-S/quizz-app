export default function GalleryItem({ src, alt, text }) {
  return (
    <div className="box relative inline-block w-40 h-40">
      <div className="absolute top-0 left-0 w-full h-full bg-black-rgba rounded-xl"></div>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-xl"
      />
      <div className="absolute inset-0 flex justify-center items-center text-white text-center font-bold text-sm">
        {text}
      </div>
    </div>
  );
}
