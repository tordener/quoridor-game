'use client';
import Link from 'next/link';
import {useEffect, useState} from 'react';
//import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/jwt';
import { useRouter } from 'next/navigation';
import React from 'react';

interface User {
    username: string;
    email?: string;
}

type NotificationResponse = {
  id: number;
  to_user: string;
  from_user: string | null;
  type: string;
  message: string;
  created_at: Date;
}


async function handleFr(notif_id: number, from_user: string, to_user: string, action: boolean){
  console.log(`${notif_id}, ${from_user}, ${to_user}, ${action}`);
  const resp = await fetch('/api/friendRequest', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({notificationId: notif_id, accept: action, from_user, to_user})
  });

  if(resp.ok){
    console.log('FR action completed')
  } else {
    console.log('FR action could not be completed');
  }
}

async function handleChallengeReq(notif_id: number, from_user: string, to_user: string, action: boolean){
  const resp = await fetch('/api/challengeRequest', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({notificationId: notif_id, accept: action, from_user, to_user})
  });

  if(resp.ok){
    console.log('FR action completed')
  } else {
    console.log('FR action could not be completed');
  }
}


function getNotificationIcon(type: string, from_user: string, to_user: string, notif_id: number){
  switch (type) {
    case 'alert' :
      return <span className="material-symbols-outlined text-cyan-700" style={{ fontSize: '30px' }}>info</span>
    case 'dm' :
      return <span className="material-symbols-outlined text-cyan-700" style={{ fontSize: '30px' }}>chat</span>
    case 'challenge' :
      return (
      <>
          <span className="material-symbols-outlined text-cyan-700" style={{ fontSize: '30px' }}>swords</span><br />
              <button
                type="button"
                onClick={()=> {handleChallengeReq(notif_id, from_user, to_user, true)}}
                className="text-white relative m-1 text-3xl w-10 h-10  lg:w-10 lg:h-10 bg-white border border-gray-300 mb-1 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl px-5 py-2.5 dark:bg-cyan-400 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            ><span className="material-symbols-outlined relative -top-2 right-3 text-[25px] sm:text-[50px] md:text-[50px] lg:text-[50px]">
            check
          </span></button>
                        <button
                type="button"
                onClick={()=> {handleChallengeReq(notif_id, from_user, to_user, false)}}
                className="text-white relative m-1 text-3xl w-10 h-10  lg:w-10 lg:h-10 bg-white border border-gray-300 mb-1 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl px-5 py-2.5 dark:bg-red-400 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            ><span className="material-symbols-outlined relative -top-2 right-3 text-[25px] sm:text-[50px] md:text-[50px] lg:text-[50px]">
            block
          </span></button>
      </>
      )
    case 'friend_request' :
      return (
      <>
        <span className="material-symbols-outlined text-cyan-700" style={{ fontSize: '30px' }}>person_add</span><br />
                      <button
                type="button"
                onClick={()=> {handleFr(notif_id, from_user, to_user, true)}}
                className="text-white relative m-1 text-3xl w-10 h-10  lg:w-10 lg:h-10 bg-white border border-gray-300 mb-1 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl px-5 py-2.5 dark:bg-cyan-400 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            ><span className="material-symbols-outlined relative -top-2 right-3 text-[25px] sm:text-[50px] md:text-[50px] lg:text-[50px]">
            check
          </span></button>
                        <button
                type="button"
                onClick={()=> {handleFr(notif_id, from_user, to_user, false)}}
                className="text-white relative m-1 text-3xl w-10 h-10  lg:w-10 lg:h-10 bg-white border border-gray-300 mb-1 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl px-5 py-2.5 dark:bg-red-400 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            ><span className="material-symbols-outlined relative -top-2 right-3 text-[25px] sm:text-[50px] md:text-[50px] lg:text-[50px]">
            block
          </span></button>
      </>
      )
  }
}

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const [notifications, setNotifications] = useState<NotificationResponse | []>([]);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const router = useRouter();

    const unseenCount = notifications.filter(n => !n.seen).length;

    useEffect(() => {
      async function fetchNotifications(){
        try {
          const res = await fetch('/api/notifications', {
            method: 'GET',
            credentials: 'include',
          });
          if(res.ok){
            const data = await res.json();
            setNotifications(data);
          } else {
            console.error('Failed to fetch notifications');
          }
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
      fetchNotifications();
    }, []);

    const toggleDropdown = async () => {
      setDropdownOpen(!dropdownOpen);

      const willOpen = !dropdownOpen;

      if(willOpen) {
        try {
          await fetch('/api/notifications/seen', {
            method: 'POST',
            credentials: 'include'
          });
        } catch (error) {
          console.error('Failed to mark notifications as seen: ', error);
        }
      }
    };

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

    const handleLogout = async () => {
        await fetch('/api/logout', {
            method: 'POST',
        });

    router.push('/login');
  }

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl border-b-10 border-b-gray-700 w-full p-3 text-white">
      <div className="flex justify-between items-center">
        <div className="mx-auto">
          <div className="py-6 px-4 sm:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-orange-400 text-3xl font-bold tracking-tight">
                <span className="text-cyan-400 material-symbols-outlined relative top-3" style={{ fontSize: "4rem" }}>
                  grid_goldenratio
                </span>
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

        <div className="text-center space-y-2">
          {user ? (
            <>
              <div className="flex flex-row relative top-2">
                <div>
                  <Link href={`/profile/${user.username}`} className="mx-auto text-cyan-300 text-lg font-bold hover:underline hover:text-cyan-300">
                    {user.username}
                  </Link>
                </div>
                <div
                  onClick={toggleDropdown}
                  className="relative rounded-full bg-cyan-300 ml-1 h-7 w-7 mx-auto focus:outline-none"
                  aria-label="Toggle notifications"
                >
                  <span className="material-symbols-outlined text-cyan-700 animate-bounce" style={{ fontSize: '30px' }}>
                    notifications
                  </span>
                  
                  {unseenCount > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {unseenCount}
                    </span>
                  )}

                  {dropdownOpen && (
                    <div className="absolute shadow-lg right-0 top-5.25 mt-2 w-80 max-h-[450px] overflow-y-auto bg-gray-900 rounded-lg shadow-lg border border-gray-700 z-50">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-400">No notifications</div>
                      ) : (
                        notifications.map((notif) => (
                          <div key={notif.id} className="px-4 py-3 border-b border-gray-700 last:border-b-0 hover:bg-gray-800 cursor-pointer">
                            {/* <p className="font-semibold text-cyan-300">{notif.type}</p> */}
                            <Link href={`/profile/${notif.from_user}`} className="font-semibold text-cyan-300">
                            {notif.from_user}
                            </Link> <br />
                            {/* <p className="font-semibold text-cyan-300">{notif.from_user}</p> */}
                            {getNotificationIcon(notif.type, notif.from_user, notif.to_user, notif.id)}
                            {notif.type === 'challenge' || notif.type === 'friend_request' ? (
                              <p className="text-xs text-gray-500">{new Date(notif.created_at).toLocaleString()}</p>
                            ) : (
                            <>
                              <p className="text-sm text-gray-300">{notif.message}</p>
                              <p className="text-xs text-gray-500">{new Date(notif.created_at).toLocaleString()}</p>
                            </>

                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

              </div>
              
              <div className="flex flex-col mx-auto w-full">
                <Link className="text-right mx-auto" href="/lobby">
                  Game Lobby
                </Link>
              
                <button onClick={handleLogout} type="submit" className="font-medium mx-auto text-white hover:underline hover:text-cyan-300 flex items-center">
                  Logout
                  <span className="material-symbols-outlined mx-auto mt-2 relative top-[-4px] ml-1">logout</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link href="/login" className="text-white hover:text-cyan-300 hover:underline">
                  Login
                </Link>
              </div>
              <div>
                <Link href="/register" className="text-white hover:text-cyan-300 hover:underline">
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
