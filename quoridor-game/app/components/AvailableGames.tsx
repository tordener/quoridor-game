export default function AvailableGames(){
    return (
        <>
<div className="bg-gray-600 rounded-tr-xl rounded-tl-xl p-3 border-b-5 border-b-gray-800">
                         <div className="flex text-3xl justify-center items-center font-bold text-gray-900">
                                 <button type="button" className="text-gray-900 text-3xl w-full h-20 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                     Create Game
                                 </button>
                         </div>
                     </div>
                     <div className="relative overflow-x-auto w-full rounded-br-xl rounded-bl-xl border-gray-100">
                         <table className="table-auto w-full">
                             <thead className="bg-gray-600 text-white">
                                 <tr>
                                     <th className="text-2xl">Opponent</th>
                                     <th></th>
                                 </tr>
                                 </thead>
                                 <tbody className="">
                                     <tr className="bg-gray-800 p-3">
                                         <td className="flex p-3">
                                             <a href="#" className="font-medium text-white over:underline hover:text-cyan-300">QuoridorFan</a>
                                         </td>
                                         <td className="bg-gray-800 p-3">
                                             <span className="material-symbols-outlined text-white">visibility</span>
                                         </td>
                                     </tr>
                                     <tr className="bg-gray-600">
                                         <td className="flex p-3">
                                             <a href="#" className="font-medium text-white over:underline hover:text-cyan-300">Anonymous</a>
                                         </td>
                                         <td className="p-3">
                                             <span className="material-symbols-outlined text-white">visibility</span>
                                         </td>
                                     </tr>
                                     <tr className="bg-gray-800">
                                         <td className="flex p-3">
                                             <a href="#" className="font-medium text-white over:underline hover:text-cyan-300">EliteGamer</a>
                                         </td>
                                         <td className="bg-gray-800 p-3">
                                             <span className="material-symbols-outlined text-white">visibility</span>
                                         </td>
                                     </tr>
                                     <tr className="bg-gray-600">
                                         <td className="flex p-3">
                                             <a href="#" className="font-medium text-white over:underline hover:text-cyan-300">HellaciousPawnPusher</a>
                                         </td>
                                         <td className="bg-gray-600 p-3">
                                             <span className="material-symbols-outlined text-white">visibility</span>
                                         </td>
                                     </tr>
                                     <tr className="bg-gray-800">
                                         <td className="flex p-3">
                                             <a href="#" className="font-medium text-white over:underline hover:text-cyan-300">Anonymous</a>
                                         </td>
                                         <td className="bg-gray-800 p-3">
                                             <span className="material-symbols-outlined text-white">visibility</span>
                                         </td>
                                     </tr>
                             </tbody>
                         </table>

                         <div className="flex flex-col items-center">

                             <span className="text-sm text-gray-700 dark:text-gray-400">
                             Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to <span className="font-semibold text-gray-900 dark:text-white">5</span> of <span className="font-semibold text-gray-900 dark:text-white">100,999</span> Games
                             </span>
                             <div className="inline-flex mt-2 xs:mt-0">

                                 <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                     <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                                     </svg>
                                     Prev
                                 </button>
                                 <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                     Next
                                     <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                     </svg>
                                 </button>
                             </div>
                         </div>

                     </div>
                 </>
                 
    );
}