import logo from "../assets/logo.png";

export function Footer() {
  return (
    <footer className="w-full bg-transparent p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-transparent text-center md:justify-between">
        <img src={logo} alt="logo-ct" className="w-[60px]" />
        
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <a
              href="/"
              className="text-gray-800 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/gallery"
              className="text-gray-800 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-gray-800 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-gray-200" />
      <p className="text-center text-gray-800 font-normal">
        &copy; 2025 EDM Flooring
      </p>
      <p className="text-center text-gray-800">build by mbrkilic</p>
    </footer>
  );
}