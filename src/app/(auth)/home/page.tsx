export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-red-500 text-2xl mb-4">キャリトーク</div>
      <div className="flex flex-col items-center gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-48">
          Googleログイン
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md w-48">
          LINEログイン
        </button>
      </div>
    </div>
  );
}
