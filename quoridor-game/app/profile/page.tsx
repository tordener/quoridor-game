import React from "react";
import Navbar from "../components/Navbar";
import GameStats from "../components/GameStats";
import GameHistory from "../components/GameHistory";
import Footer from "../components/Footer";
import ProfileName from "../components/ProfileName";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <Navbar />

      <main className="flex flex-col flex-grow w-full px-4">
        {/* Username and avatar section */}
        <div className="lg:w-3/4 w-full mx-auto mt-6">
          <ProfileName />
        </div>

        {/* Section title: Recent Games */}
        <div className="flex w-full text-2xl font-bold text-gray-400 mt-4">
          <div className="" />
          <div className="w-3/4">
            <p className="text-center text-gray-200">Recent Games</p>
          </div>
        </div>

        {/* Stats and Game history side-by-side */}
        <div className="flex w-full max-w-5xl mx-auto mt-4">
          <div className="w-30 mr-1">
            <GameStats />
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
