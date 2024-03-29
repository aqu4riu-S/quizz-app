export default function QuestionBox({ children }) {
  return (
    <div className="main w-4/5 max-w-full p-8 bg-white text-black rounded-xl h-fit">
      {children}
    </div>
  );
}
