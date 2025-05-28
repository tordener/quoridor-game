export default function Navbar() {
    return (
            <div className="bg-gray-800 shadow-xl border-b-10 border-b-gray-700 w-full p-3 text-white">
                <div className="flex justify-between items-center">
                    <div className="mx-auto">
                        <div className="py-6 px-4 sm:px-8 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="text-orange-400 text-3xl font-bold tracking-tight">
                                    <span className="text-orange-400  material-symbols-outlined relative top-3" style={{ fontSize: "4rem" }}>grid_goldenratio</span>
                                </div>
                                <div>
                                    <h1 className="text-white text-3xl sm:text-5xl font-semibold leading-tight">
                                    Qu<span className="animate-pulse text-white">o</span>rid<span className="text-cyan-900 animate-pulse">o</span>r
                                    </h1>
                                    <p className="text-cyan-400 text-xs sm:text-base">A TypeScript Implementation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div>
                            Welcome, <a href="/profile" className="font-medium text-white over:underline hover:text-cyan-300">QuoridorFan</a>!
                        </div>
                        <div>
                            <a href="/logout" className="font-medium text-white over:underline hover:text-cyan-300">Logout</a>
                            <span className="material-symbols-outlined relative top-[6px]">logout</span>
                        </div>
                        <div className="flex flex-col mx-auto w-full">
                            <a className="text-right" href="/lobby">Game Lobby</a>
                        </div>
                    </div>
                </div>
            </div>
    );
}