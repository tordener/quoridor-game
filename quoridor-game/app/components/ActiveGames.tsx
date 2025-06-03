export default function ActiveGames(){
    return (
        <>
            <div className="bg-gray-900 rounded-tr-xl rounded-xl border-b-5 border-b-gray-800 overflow-y-auto h-64">
                <p className="text-center text-2xl text-white font-bold">Active Games</p>
                <table>
                    <thead>
                        <th  className="p-3 text-center text-cyan-300">White</th>
                        <th  className="p-3 text-center text-cyan-300">Black</th>
                        <th  className="p-3 text-center text-cyan-300">Control</th>
                        <th  className="p-3 text-center text-cyan-300">Ranked?</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td  className="p-3 text-center text-cyan-300">Balls <small><strong>(682)</strong></small></td>
                            <td  className="p-3 text-center text-cyan-300">Balls <small><strong>(682)</strong></small></td>
                            <td  className="p-3 text-center text-cyan-300">Balls</td>
                            <td  className="p-3 text-center text-cyan-300">Balls</td>
                        </tr>
                        <tr>
                            <td  className="p-3 text-center text-cyan-300">Balls</td>
                            <td  className="p-3 text-center text-cyan-300">Balls</td>
                            <td  className="p-3 text-center text-cyan-300">Balls</td>
                            <td  className="p-3 text-center text-cyan-300">Balls</td>
                        </tr>
                    </tbody>
                </table>             
            </div>
        </>
    );
}