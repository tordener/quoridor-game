import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LeaderBoard from "../components/LeaderBoard";
import AvailableGames from "../components/AvailableGames";
import CreateGame from "../components/CreateGame";
import ActiveGames from "../components/ActiveGames";
import WatchRandomGame from "../components/WatchRandomGame";
export default function GameLobby(){
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-t from-cyan-700 to-gray-900 text-white">
            <div>
                <Navbar />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
                <div className="p-2">
                    <LeaderBoard />
                </div>
                <div className="p-2">
                    <div className="flex flex-row">
                        <CreateGame />
                        <WatchRandomGame />
                    </div>
                    <AvailableGames />
                    <ActiveGames />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}