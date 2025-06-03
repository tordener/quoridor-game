import React from "react";
import Navbar from "../../components/Navbar";
import GameStats from "../../components/GameStats";
import GameHistory from "../../components/GameHistory";
import Footer from "../../components/Footer";
import ProfileName from "../../components/ProfileName";
import FriendsWidget from "../../components/FriendsWidget";
import db from "@/lib/db";

interface ProfilePageProps {
  params : {
    username: string;
    elo: number;
    games: number;
    wins: number;
    losses: number;
    rank: number;
    friends: number[];
    created_at: string | Date;
  }
}

export default async function ProfilePage({params} : ProfilePageProps) {
  const {username} = await params;
  const profileData = await db
        .selectFrom('profiles')
        .innerJoin('users', 'users.username', 'profiles.username')
        .select([
          'profiles.username',
          'profiles.elo',
          'profiles.games',
          'profiles.wins',
          'profiles.losses',
          'profiles.rank',
          'profiles.friends',
          'users.created_at'
        ])
        .where('profiles.username', '=', username)
        .executeTakeFirst();
  if(!profileData){
    return (
      <>
      <p>frick</p>
      </>
    )
  }
  return (
<div className="flex flex-col min-h-screen bg-gradient-to-t from-cyan-700 to-gray-900 text-white">
  <Navbar />

  <main className="flex flex-col flex-grow w-full px-4 mt-3">
    {/* <div className="flex flex-row w-full">
          <div className="w-full mb-1">
            <GameStats
              games={profileData.games}
              rating={profileData.elo}
              wins={profileData.wins}
              losses={profileData.losses}
              rank={profileData.rank}
              profileUsername={profileData.username}
            />
          </div>
    </div> */}
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-1">

      {/* Left Column: Achievements */}
      <div className="flex flex-col w-full lg:w-64 bg-gray-900 rounded-xl p-4 min-h-[400px]">
        <div>
          <ProfileName username={profileData.username} createdAt={profileData.created_at} />
        </div>

<hr className="text-cyan-800 mb-2 mt-2 "/>
    <div className="flex flex-row w-full">
          <div className="w-full mb-1">
            <GameStats
              games={profileData.games}
              rating={profileData.elo}
              wins={profileData.wins}
              losses={profileData.losses}
              rank={profileData.rank}
              profileUsername={profileData.username}
            />
          </div>
    </div>

<hr className="text-cyan-800 mb-2 mt-2 "/>

        <div className="text-lg font-bold text-center mb-4 bg-gray-800 size-30 mx-auto rounded-full px-4 py-5">
          <p>Awards</p>
          <span className="material-symbols-outlined text-cyan-200" style={{ fontSize: '50px' }}>
            military_tech
          </span>
        </div>
        <hr className="w-full border-gray-700 mb-4" />
        <div className="text-white font-bold text-sm text-center space-y-6 flex-grow">
          <div>
            <p>Participation Trophy</p>
            <span className="material-symbols-outlined text-cyan-200" style={{ fontSize: '50px' }}>
              person_raised_hand
            </span>
          </div>
          <div>
            <p>Social Butterfly</p>
            <span className="material-symbols-outlined text-cyan-200" style={{ fontSize: '50px' }}>
              crowdsource
            </span>
          
          </div>
        </div>
        <div className="mx-auto gap-4">
          <div className="flex-grow">
            <FriendsWidget username={profileData.username}/>
          </div>
        </div>
      </div>


      <div className="flex flex-row  w-full mx-auto flex-grow gap-4 min-h-[400px]">
        <div className="flex flex-col sm:flex-row w-full h-full gap-4">

          <div className="flex-grow w-full">
            <GameHistory />
          </div>
        </div>
      </div>
    </div>
  </main>

  <Footer />
</div>
  );
}
