const categories = [
  {
    id: 1,
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
  },
  {
    id: 2,
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
  },
  {
    id: 3,
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300",
  },
  {
    id: 4,
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
  },
  {
    id: 5,
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300",
  },
  {
    id: 6,
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300",
  },
  {
    id: 7,
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300",
  },
  {
    id: 8,
    name: "Toys",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300",
  },
];

const CategorySection = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 py-16">

      <div className="text-center mb-12">
        <p className="text-orange-500 font-semibold uppercase tracking-widest">
          Shop By Category
        </p>
        <p className="text-gray-500 mt-3">
          Find exactly what you're looking for
        </p>
      </div>

      <div
        className="
        flex
        gap-6
        overflow-x-auto
        scroll-smooth
        pb-4
        scrollbar-hide
      "
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="
            min-w-[170px]
            bg-white
            rounded-3xl
            shadow-md
            p-5
            text-center
            hover:-translate-y-2
            hover:shadow-xl
            duration-300
            cursor-pointer
            flex-shrink-0
          "
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover hover:scale-110 duration-300"
              />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;