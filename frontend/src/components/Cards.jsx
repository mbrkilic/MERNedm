import { assets } from "../assets/assets";

function Cards() {
  return (
    <div className="w-full px-4 bg-white mb-10">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Our Services
      </h1>
      <p className="text-center text-gray-500 mb-8 max-w-[320px] mx-auto">
        Our services include revitalizing your floors with expert floor
        recoating, refinishing worn-out wood, and repairing damage to restore
        their beauty and functionality.
      </p>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8 mt-20">
        <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105">
          <img
            className="w-20 mx-auto mt-[-2rem] bg-white"
            src={assets.icon_refinish}
            alt="single"
          />
          <h2 className="text-2xl font-bold text-center py-8">
            Floor Refinish
          </h2>
          <p className="text-center text-md text-gray-500">
            Floor Refinishing revitalizes worn-out wood floors by removing old
            finishes, repairing damage, and applying new coats for a renewed
            appearance.
          </p>
        </div>

        <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105">
          <img
            className="w-20 mx-auto mt-[-2rem] bg-white"
            src={assets.icon_repair}
            alt="single"
          />
          <h2 className="text-2xl font-bold text-center py-8">Floor Repair</h2>
          <p className="text-center text-md text-gray-500">
            Floor Repair restores damaged flooring to its original condition,
            addressing issues like scratches, dents, water damage, and loose
            boards.
          </p>
        </div>

        <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105">
          <img
            className="w-20 mx-auto mt-[-2rem] bg-white"
            src={assets.icon_re_coast}
            alt="single"
          />
          <h2 className="text-2xl font-bold text-center py-8">
            Floor Re-Coats
          </h2>
          <p className="text-center text-md text-gray-500">
            Floor Re-coating applies new layers of finish over existing ones to
            protect and restore the shine and durability of wood floors.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cards;
