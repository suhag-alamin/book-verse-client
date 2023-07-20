import hero from '../../assets/images/hero.jpg';
const Hero = () => {
  return (
    <div>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
          <div className="lg:col-span-3">
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6x">
              {/* book catalog */}
              BookVerse <br />{' '}
              <span className="text-bookVersePrimary">Catalog</span>
            </h1>
            <p className="mt-3 text-lg text-gray-800">
              The best place to find your favorite books and authors in one
              place and in one click away from you.
            </p>
          </div>

          <div className="lg:col-span-4 mt-10 lg:mt-0">
            <img
              className="w-full rounded-xl"
              src={hero}
              alt="BookVerse Catalog"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
