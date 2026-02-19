export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-green-400 opacity-20"></div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-600">Loading delicious data...</p>
    </div>
  );
}