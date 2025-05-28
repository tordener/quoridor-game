export default function GameStats(){
    return (
    <div className="flex flex-col w-20 sm:w-35 md:w-35 lg:w-35 mt-2 mb-2">
      <div className="relative overflow-x-auto w-40 rounded-br-xl rounded-bl-xl border-gray-100 text-white font-bold">
        <button
          type="button"
          className="text-white ml-3 text-3xl w-16 h-16  lg:w-[120px] lg:h-[120px] bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 dark:bg-red-400 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <span className="material-symbols-outlined text-[25px] sm:text-[50px] md:text-[50px] lg:text-[50px]">
            swords
          </span>
        </button>

        {/* Rating */}
        <div className="bg-gray-300 rounded-xl shadow-lg ml-3 m-1 w-16 h-16 lg:w-30 lg:h-30 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-800 text-center font-bold">Rating</p>
          <p className="text-lg text-gray-900 text-center font-bold">2581</p>
        </div>

        {/* Games */}
        <div className="bg-gray-300 rounded-xl shadow-lg ml-3 m-1 w-16 h-16 lg:w-30 lg:h-30 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-800 text-center font-bold">Games</p>
          <p className="text-sm text-gray-900 text-center font-bold">258,166</p>
        </div>

        {/* Rank */}
        <div className="bg-gray-300 rounded-xl shadow-lg ml-3 m-1 w-16 h-16 lg:w-30 lg:h-30 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-800 text-center font-bold">Rank</p>
          <p className="text-2xl text-gray-900 text-center font-bold">#3</p>
        </div>
      </div>
    </div>
    );
}