export function Stats() {
  return (
    <section className="flex items-center justify-center bg-brown-500">
      <div className="flex flex-col items-center justify-center  px-4 py-10">
        <div className="font-title text-4xl flex gap-2">
          <span className="text-white">120</span>
          <span className="font-bold">+</span>
        </div>
        <span className="text-white font-title text-xl">Coffee Varieties</span>
      </div>
      <div className="flex flex-col items-center justify-center  px-4 py-10">
        <div className="font-title text-4xl flex gap-2">
          <span className="text-white">50</span>
          <span className="font-bold">+</span>
        </div>
        <span className="text-white font-title text-xl">Tested Hours</span>
      </div>
      <div className="flex flex-col items-center justify-center  px-4 py-10">
        <div className="font-title text-4xl flex gap-2">
          <span className="text-white">200</span>
          <span className="font-bold">+</span>
        </div>
        <span className="text-white font-title text-xl">Coffee Brands</span>
      </div>
      <div className="flex flex-col items-center justify-center  px-4 py-10">
        <div className="font-title text-4xl flex gap-2">
          <span className="text-white">265</span>
          <span className="font-bold">+</span>
        </div>
        <span className="text-white font-title text-xl">Coffee Markets</span>
      </div>
    </section>
  );
}
