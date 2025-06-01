import React from "react";
import Navbar from "../../components/Navbar";
import GameStats from "../../components/GameStats";
import GameHistory from "../../components/GameHistory";
import Footer from "../../components/Footer";
import ProfileName from "../../components/ProfileName";
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
  const {username} = params;
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
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <Navbar />

      <main className="flex flex-col flex-grow w-full px-4">
        {/* Username and avatar section */}
        <div className="lg:w-3/4 w-full mx-auto">
          <ProfileName username={profileData.username} createdAt={profileData.created_at} />
            <p className="text-center sm:text-right lg:text-center text-gray-200 text-large">Recent Games</p>
        </div>

        {/* Section title: Recent Games */}
        <div className="flex w-full text-lg text-gray-400">
          <div className="" />
          <div className="w-3/4">
          </div>
        </div>

        {/* Stats and Game history side-by-side */}
        <div className="flex w-full max-w-5xl mx-auto">
          <div className="w-20 sm:w-20 md:w-30 lg:w-30 lg:mr-1">
            <GameStats rank={profileData.rank} rating={profileData.elo} games={profileData.games}/>
          </div>
          <div className="w-full ml-1 sm:ml-1 md:ml-1 lg:ml-3">
            <GameHistory />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
