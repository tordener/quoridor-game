export default function AvailableGames(){
    return (
        <>
            <div className="bg-gray-900 rounded-tr-xl rounded-xl border-b-5 border-b-gray-800 overflow-y-auto h-64">
                <p className="text-center text-2xl text-white font-bold">Available Games</p>
                <table>
                    <thead>
                        <th  className="p-3 text-center text-cyan-300">Opponent</th>
                        <th  className="p-3 text-center text-cyan-300">Rating</th>
                        <th  className="p-3 text-center text-cyan-300">Control</th>
                        <th  className="p-3 text-center text-cyan-300">Ranked?</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td  className="text-center text-cyan-300">Balls</td>
                            <td  className="text-center text-cyan-300">Balls</td>
                            <td  className="text-center text-cyan-300">Balls</td>
                            <td  className="text-center text-cyan-300">Balls</td>
                        </tr>
                        <tr>
                            <td  className="text-center text-cyan-300">Balls</td>
                            <td  className="text-center text-cyan-300">Balls</td>
                            <td  className="text-center text-cyan-300">Balls</td>
                            <td  className="text-center text-cyan-300">Balls</td>
                        </tr>
                    </tbody>
                </table>             
            </div>
        </>
                 
    );
}