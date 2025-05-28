export default function LeaderBoard(){
    return (
                    <div className="p-2">
                        <p className="text-white font-bold text-2xl">Standings</p>
                         <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                             <li className="pb-3 sm:pb-4">
                                 <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                     <div className="shrink-0">
                                         <p className="text-5xl text-yellow-400">1st</p>
                                         <span className="material-symbols-outlined text-3xl text-yellow-600 pl-3" style={{fontSize: "50px"}}>trophy</span>
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <p className="font-medium text-5xl text-gray-900 truncate dark:text-white">
                                         EliteGamer
                                         </p>
                                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                         895,012 Wins - 3 Losses
                                         </p>
                                     </div>
                                 </div>
                             </li>
                             <li className="py-3 sm:py-4">
                                 <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                     <div className="shrink-0">
                                         <p className="text-2xl text-gray-200">2nd</p>
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                         QuoridorFan
                                         </p>
                                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                         3 Wins - 895,012 Losses
                                         </p>
                                     </div>
                                 </div>
                             </li>
                             <li className="py-3 sm:py-4">
                                 <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                     <div className="shrink-0">
                                         <p className="text-2xl text-gray-200">3rd</p>
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                         Linus Torvalds
                                         </p>
                                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                         1 Win - 0 Losses
                                         </p>
                                     </div>
                                 </div>
                             </li>
                             <li className="py-3 sm:py-4">
                                 <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                     <div className="shrink-0">
                                     <p className="text-2xl text-gray-200">4th</p>
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                         Terry A. Davis
                                         </p>
                                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                         Infinite Wins - NaN
                                         </p>
                                     </div>
                                 </div>
                             </li>
                             <li className="pt-3 pb-0 sm:pt-4">
                                 <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                     <div className="shrink-0">
                                         <p className="text-2xl text-gray-200">5th</p>
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                         HellaciousPawnPusher
                                         </p>
                                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                         12 Wins - 12 Losses
                                         </p>
                                     </div>
                                 </div>
                             </li>
                         </ul>
                     </div>
    );
}