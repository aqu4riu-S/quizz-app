export default function NavBar({ children }) {
  return (
    <div className="header flex justify-between items-center text-lg">
      {children}
    </div>
  );
}
