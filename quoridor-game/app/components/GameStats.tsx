'use client';
import {useState, useEffect} from 'react';

interface User {
  username: string;
  email?: string;
}

interface GameStatsProps {
    rating: number;
    games: number;
    wins: number;
    losses: number;
    rank: number;
    profileUsername: string;
}





export default function GameStats({rating, games, wins, losses, rank, profileUsername} : GameStatsProps){
  
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
      async function fetchUser(){
        const res = await fetch('/api/auth/me');
        if(res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      }
      fetchUser();
    }, []);

    const handleChallengePlayer = async () => {
      try {
        const res = await fetch('/api/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            type: 'challenge',
            to_user: profileUsername,
            //from_user: user?.username,
            message: 'turds',
          }),
        });

        if(res.ok) {
          console.log('notification sent');
        } else {
          console.error('failed to send notification');
        }
      } catch (error) {
        console.error('Error sending notification', error);
      }
    }

    const handleSendFriendRequest = async () => {
      try {
        const res = await fetch('/api/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            type: 'friend_request',
            to_user: profileUsername,
            message: 'turds',
          }),
        });

        if(res.ok) {
          console.log('notification sent');
        } else {
          console.error('failed to send notification');
        }
      } catch (error) {
        console.error('Error sending notification', error);
      }
    }
    return (
    <div className="flex flex-row w-full justify-center flex-wrap h-full">
        {user && (
          <>
          <div className="relative  w-20 rounded-br-xl rounded-bl-xl border-gray-100 text-white font-bold">
            <button
              type="button"
              onClick={handleSendFriendRequest}
              className="text-white ml-3 mb-6 relative top-1 text-3xl w-16 h-16  lg:w-16 lg:h-16 bg-white border border-gray-300 mb-1 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl px-5 py-2.5 dark:bg-cyan-500 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <span className="material-symbols-outlined text-[25px] sm:text-[50px] md:text-[50px] lg:text-[50px]">
                person_add
              </span><p className="text-sm relative -top-2 right-2.5 font-bold">Friend</p>
            </button>
            </div>
            <button
              type="button"
              onClick={handleChallengePlayer}
              className="text-white ml-3 text-3xl relative top-1 w-16 h-16  lg:w-16 lg:h-16 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl px-5 py-2.5 dark:bg-red-400 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <span className="material-symbols-outlined text-[25px] sm:text-[50px] md:text-[50px] lg:text-[50px]">
                swords
                
              </span>
              <p className="text-sm relative -top-2 right-1.5 font-bold">Fight</p>
            </button>
          </>
        )}
        

        
        

        {/* Rating */}
        <div className="bg-gray-200 rounded-full shadow-lg ml-3 m-1 w-16 h-16 lg:w-16 lg:h-16 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-800 text-center font-bold">Rating</p>
          <p className="text-lg text-gray-900 text-center font-bold">{rating}</p>
        </div>

        {/* Games */}
        <div className="bg-gray-300 rounded-full shadow-lg ml-3 m-1 w-16 h-16 lg:w-16 lg:h-16 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-800 relative -top-1.25 text-center font-bold">Games</p>
          <p className="text-sm text-gray-900 text-center font-bold">{games}</p>
        </div>

        <div className="bg-gray-300 rounded-full shadow-lg ml-3 m-1 w-16 h-16 lg:w-16 lg:h-16 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-800 text-center font-bold">Wins</p>
          <p className="text-2xl text-gray-900 text-center font-bold">{wins}</p>
        </div>
        <div className="bg-gray-300 rounded-full shadow-lg ml-3 m-1 w-16 h-16 lg:w-16 lg:h-16 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-800 text-center font-bold">Loss</p>
          <p className="text-2xl text-gray-900 text-center font-bold">{losses}</p>
        </div>

        {/* Rank */}
        <div className="bg-gray-300 rounded-xl shadow-lg ml-3 m-1 w-16 h-16 lg:w-16 lg:h-16 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-800 text-center font-bold">Rank</p>
          <p className="text-2xl text-gray-900 text-center font-bold">{rank}</p>
        </div>

        
      
    </div>
    );
}