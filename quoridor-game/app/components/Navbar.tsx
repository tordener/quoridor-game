import Link from 'next/link';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/jwt';

export default function Navbar() {
  const cookie = cookies().get('session')?.value;
  const user = cookie ? verifyJwt(cookie) : null;

  return (
    <div className="bg-gray-800 shadow-xl border-b-10 border-b-gray-700 w-full p-3 text-white">
      <div className="flex justify-between items-center">
        <div className="mx-auto">
          <div className="py-6 px-4 sm:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-orange-400 text-3xl font-bold tracking-tight">
                <span className="text-orange-400 material-symbols-outlined relative top-3" style={{ fontSize: "4rem" }}>
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

        <div className="text-right space-y-2">
          {user ? (
            <>
              <div>
                Welcome,{' '}
                <Link href="/profile" className="font-medium text-white hover:underline hover:text-cyan-300">
                  {user.username}
                </Link>
                !
              </div>
              <form action="/api/logout" method="POST">
                <button type="submit" className="font-medium text-white hover:underline hover:text-cyan-300 flex items-center">
                  Logout
                  <span className="material-symbols-outlined relative top-[6px] ml-1">logout</span>
                </button>
              </form>
              <div className="flex flex-col mx-auto w-full">
                <Link className="text-right" href="/lobby">
                  Game Lobby
                </Link>
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
