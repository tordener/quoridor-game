
export default function GameHistory(){
    
    const games = [
        { opponent: "Linus Torvalds", result: "win", time: "Just now" },
        { opponent: "Dennis Ritchie", result: "win", time: "2 hours ago" },
        { opponent: "Terry A. Davis", result: "loss", time: "3 hours ago" },
        { opponent: "Bjarne Stroustrup", result: "win", time: "4 hours ago" },
        { opponent: "William Henry Gates III", result: "win", time: "2 days ago" },
        { opponent: "John Carmack", result: "loss", time: "June 16, 2027" },
        { opponent: "Lex Fridman", result: "loss", time: "June 4, 1944" },
    ];
    return (
        <div className="flex flex-col w-full lg:flex-1 bg-gray-900 p-4 m-1 rounded-xl shadow">
      {games.map(({ opponent, result, time }, i) => (
        <div
          key={i}
          className={`m-1 rounded-sm p-2 font-bold text-white text-center text-[10px] sm:text-[16px] lg:text-[16px] ${
            result === "win" ? "bg-green-700" : "bg-red-700"
          }`}
        >
          <p>
            EliteGamer{" "}
            <span className="material-symbols-outlined align-middle">swords</span>{" "}
            {opponent}
            <br />
            <span className="text-sm font-normal">... {time}</span>
          </p>
        </div>
      ))}
    </div>
    );
}