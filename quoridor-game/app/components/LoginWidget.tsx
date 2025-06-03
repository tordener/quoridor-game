'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginWidget(){
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            const data = await res.json();
    
            if(res.ok && data.user?.username){
                router.push(`/profile/${data.user.username}`)
            } else {
                alert('login failed');
            }
        } catch (error) {
            console.error('login error: ', error);
            alert('an error occured');
        }
    };
    return (
        <>
        
        <form onSubmit={handleSubmit} className="bg-gray-900 m-1 p-10 rounded-xl shadow-xl p-3 lg:w-1/4  md:w-1/2 sm:w-full xs: w-full mx-auto text-white">
                <div className="bg-gray-900 rounded-tr-xl rounded-tl-xl mb-5">
                    <div className="py-6 px-4 sm:px-8 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            
                            <div>
                                <h1 className="text-white text-5xl sm:text-5xl text-center font-semibold leading-tight">
                                Sign in
                                </h1>
                                <p className="text-cyan-400 text-sm sm:text-base">Registered users can compete in tournaments, add friends, and keep track of their games</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <input type="text" className="bg-gray-900 mb-2 border border-cyan-900 text-gray-900 text-sm rounded-lg focus:ring-cyan-900 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-cyan-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                </div>
                <div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-900 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-cyan-900 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-cyan-700 mb-2 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
                </div>
                <div className="mt-2">
                    <button type="submit" id="submit" className="text-gray-900 text-3xl w-full bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-cyan-900 dark:text-white dark:border-cyan-900 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                     Go!
                    </button>
                </div>
                <div className="mt-2 mb-7 justify-center text-center">
                    <a href="#" className="font-medium text-white over:underline hover:text-cyan-300 mx-auto">Forgot Username</a><br />
                    <a href="#" className="font-medium text-white over:underline hover:text-cyan-300">Forgot Password</a><br />
                    <a href="/register" className="font-medium text-white over:underline hover:text-cyan-300">Register</a>
                </div>
             </form>
        </>
    );
}