import Navbar from "./Navbar";
import home from "../assets/home.jpg"

function Header() {
  return (
    <div
      className="h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden"
      style={{ backgroundImage: `url(${home})` }}
    >
      <Navbar />
      <div className="container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white">
        <h2 className="text-5xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-20 mb-4">
          EDM Flooring
        </h2>
        <p className=" text-xl sm:text-2xl ">
          Fast, courteous and inexpensive refinishing floors, <br />
          installing flooring & repairing flooring in Edmonton.
        </p>
        <div className="space-x-4 sm:space-x-6 md:space-x-8 mt-16">
          <a
            href="/galery"
            className="border border-white px-8 py-3 rounded sm:px-6 sm:py-2"
          >
            Gallery
          </a>
          <a
            href="/contact"
            className="bg-blue-500 px-8 py-3 rounded sm:px-6 sm:py-2"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
