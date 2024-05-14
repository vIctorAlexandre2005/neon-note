export default function Home() {
  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-xl text-neon-400 font-semibold mb-4">Todo List</h2>
      <ul className="divide-y divide-neon-900">
        <li className="flex items-center bg-neon-950 rounded-md p-12 justify-between py-2">
          <span className="flex-1 text-neon-50">Item 1</span>
          <button className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
        </li>
        <li className="flex items-center bg-neon-950 rounded-md p-12 justify-between py-2">
          <span className="flex-1 text-neon-50">Item 2</span>
          <button className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
        </li>
        <li className="flex items-center bg-neon-950 rounded-md p-12 justify-between py-2">
          <span className="flex-1 text-neon-50">Item 3</span>
          <button className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
        </li>
      </ul>
    </div>
  );
}