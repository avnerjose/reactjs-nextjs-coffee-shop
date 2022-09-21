export function Stats() {
  return (
    <section className="flex items-center justify-center bg-brown-500">
      <ul className="flex">
        <li className="flex flex-col items-center justify-center  px-4 py-10">
          <div className="font-title text-4xl flex gap-2">
            <span className="text-white">120</span>
            <span className="font-bold">+</span>
          </div>
          <span className="text-white font-title text-xl">
            Coffee Varieties
          </span>
        </li>
        <li className="flex flex-col items-center justify-center  px-4 py-10">
          <div className="font-title text-4xl flex gap-2">
            <span className="text-white">50</span>
            <span className="font-bold">+</span>
          </div>
          <span className="text-white font-title text-xl">Tested Hours</span>
        </li>
        <li className="flex flex-col items-center justify-center  px-4 py-10">
          <div className="font-title text-4xl flex gap-2">
            <span className="text-white">200</span>
            <span className="font-bold">+</span>
          </div>
          <span className="text-white font-title text-xl">Coffee Brands</span>
        </li>
        <li className="flex flex-col items-center justify-center  px-4 py-10">
          <div className="font-title text-4xl flex gap-2">
            <span className="text-white">265</span>
            <span className="font-bold">+</span>
          </div>
          <span className="text-white font-title text-xl">Coffee Markets</span>
        </li>
      </ul>
    </section>
  );
}
