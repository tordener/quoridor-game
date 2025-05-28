import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LeaderBoard from "../components/LeaderBoard";
import AvailableGames from "../components/AvailableGames";

export default function GameLobby(){
    return (
        <div className="flex flex-col min-h-screen bg-gray-800 text-white">
            <div>
                <Navbar />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
                <div className="p-2">
                    <LeaderBoard />
                </div>
                <div className="p-2">
                    <AvailableGames />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}