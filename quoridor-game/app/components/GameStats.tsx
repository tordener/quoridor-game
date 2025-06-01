interface GameStatsProps {
    rating: number;
    rank: number;
    games: number;
}

export default function GameStats({rating, rank, games} : GameStatsProps){
    return (
    <div className="flex flex-row w-full justify-center flex-wrap h-full">
      <div className="relative  w-20 rounded-br-xl rounded-bl-xl border-gray-100 text-white font-bold">
        <button
          type="button"
          className="text-white ml-3 relative top-1 text-3xl w-16 h-16  lg:w-16 lg:h-16 bg-white border border-gray-300 mb-1 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl px-5 py-2.5 dark:bg-cyan-400 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <span className="material-symbols-outlined text-[25px] sm:text-[50px] md:text-[50px] lg:text-[50px]">
            person_add
          </span><p className="text-sm relative -top-2 right-2.5 font-bold">Friend</p>
        </button>
        </div>
        <button
          type="button"
          className="text-white ml-3 text-3xl relative top-1 w-16 h-16  lg:w-16 lg:h-16 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl px-5 py-2.5 dark:bg-red-400 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <span className="material-symbols-outlined text-[25px] sm:text-[50px] md:text-[50px] lg:text-[50px]">
            swords
            
          </span>
          <p className="text-sm relative -top-2 right-1.5 font-bold">Fight</p>
        </button>
        

        
        

        {/* Rating */}
        <div className="bg-gray-300 rounded-xl shadow-lg ml-3 m-1 w-16 h-16 lg:w-16 lg:h-16 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-800 text-center font-bold">Rating</p>
          <p className="text-lg text-gray-900 text-center font-bold">{rating}</p>
        </div>

        {/* Games */}
        <div className="bg-gray-300 rounded-xl shadow-lg ml-3 m-1 w-16 h-16 lg:w-16 lg:h-16 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-800 text-center font-bold">Games</p>
          <p className="text-sm text-gray-900 text-center font-bold">{games}</p>
        </div>

        <div className="bg-gray-300 rounded-xl shadow-lg ml-3 m-1 w-16 h-16 lg:w-16 lg:h-16 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-800 text-center font-bold">Wins</p>
          <p className="text-2xl text-gray-900 text-center font-bold">{rank}</p>
        </div>
        <div className="bg-gray-300 rounded-xl shadow-lg ml-3 m-1 w-16 h-16 lg:w-16 lg:h-16 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-800 text-center font-bold">Losses</p>
          <p className="text-2xl text-gray-900 text-center font-bold">{rank}</p>
        </div>

        {/* Rank */}
        <div className="bg-gray-300 rounded-xl shadow-lg ml-3 m-1 w-16 h-16 lg:w-16 lg:h-16 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-800 text-center font-bold">Rank</p>
          <p className="text-2xl text-gray-900 text-center font-bold">{rank}</p>
        </div>

        
      
    </div>
    );
}