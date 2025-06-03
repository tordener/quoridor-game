'use client';

import {useEffect, useState} from 'react';

interface FriendsWidgetProps {
    username: string;
}

export default function FriendsWidget({username} : FriendsWidgetProps){
    const [friends, setFriends] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFriends(){
            try {
                const res = await fetch(`/api/friends?username=${username}`);
                const data = await res.json();

                setFriends(data.friends || []);
            } catch (error) {
                console.error('Failed to load friends:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchFriends();
    }, [username]);

  return (
    <div className="bg-opacity-50 bg-cyan-700 rounded-xl text-white p-5 w-[225px] h-[525px]">
      <div className="text-center text-xl font-bold">
        <p className="p-3">Friends ({friends.length})</p>
        <hr className="text-cyan-900 mb-3" />
      </div>

      <div className="h-[425px] overflow-y-auto pr-3">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : friends.length === 0 ? (
          <p className="text-center text-gray-500">No friends yet.</p>
        ) : (
          <ul className="space-y-3">
            {friends.map((friend, idx) => (
              <li key={idx}>
                <div className="flex justify-between items-center pr-2 pl-2  rounded-xl bg-cyan-900">
                  <a
                    href={`/profile/${friend}`}
                    className="text-cyan-300 text-sm font-bold hover:underline"
                  >
                    {friend}
                  </a>
                  {/* Randomly simulate online/offline for now */}
                  <span
                    className={`w-3 h-3 rounded-full ${
                      Math.random() > 0.5 ? 'bg-cyan-400' : 'bg-red-500'
                    }`}
                  ></span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}