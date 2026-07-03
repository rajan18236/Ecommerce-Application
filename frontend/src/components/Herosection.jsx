import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600",
    title: "New Summer Collection",
    subtitle: "Up to 50% OFF on Premium Fashion",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
    title: "Latest Sneakers",
    subtitle: "Comfort meets Style",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600",
    title: "Luxury Accessories",
    subtitle: "Complete Your Look",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600",
    title: "Mega Sale",
    subtitle: "Grab the Best Deals Before They're Gone",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[75vh] w-full overflow-hidden">
      {/* Slider */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative min-w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/45"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-xl text-white">
                  <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl mb-8">
                    {slide.subtitle}
                  </p>

                  <button className="bg-white text-black px-7 py-3 rounded-full font-semibold hover:bg-yellow-400 transition">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Previous */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white w-12 h-12 rounded-full hover:bg-white/50 transition"
      >
        ❮
      </button>

      {/* Next */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white w-12 h-12 rounded-full hover:bg-white/50 transition"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full transition-all ${
              current === index
                ? "w-8 bg-white"
                : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;