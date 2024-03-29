export default function Footer({ children }) {
  console.log(children);
  return (
    <div className="flex justify-between mt-8">
      {children[0]}
      <div className="flex items-center gap-6">
        {children[1]}
        {children[2]}
      </div>
    </div>
  );
}
