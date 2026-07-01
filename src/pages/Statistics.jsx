export default function Statistics() {
  const stats = [
    ["5000+", "Farmers"],

    ["300+", "Groups"],

    ["120", "Facilitating Agencies"],

    ["25", "Districts"],
  ];

  return (
    <section className="bg-green-800 text-white py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center">
        {stats.map((item, index) => (
          <div key={index}>
            <h2 className="text-5xl font-bold">{item[0]}</h2>

            <p className="mt-4">{item[1]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
