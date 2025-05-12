import Logo from "../resources/Logo.svg";
import HeroImg from "../resources/hero-image.jpg";
import HeroImgSmall from "../resources/hero-image-sm.jpg";

function Hero() {
  return (
    <div className="w-[100%] relative pt-5 bg-black">
      <div className="w-[100%] h-[40vh]">
        <picture>
          <source media="(max-width: 600px)" srcSet={HeroImgSmall} />

          <img
            className="w-full h-[40vh] object-cover rounded-lg shadow-lg md:hidden"
            src={HeroImg} // Fallback for larger screens
            alt="hero"
          />
        </picture>
        {/* Large image for screens wider than 600px */}
        <img
          className="hidden md:block w-full h-[40vh] object-cover rounded-lg shadow-xl"
          src={HeroImg}
          alt="hero"
        />
      </div>
      <div className="left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute top-28 md:top-28 lg:top-30 xl:top-38">
        <img className="  z-10 md:scale-100 " src={Logo} alt="logo" />
      </div>
    </div>
  );
}

export default Hero;
