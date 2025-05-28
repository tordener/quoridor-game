'use client';
import { useState } from 'react';
import { NextResponse } from 'next/server';

export default function RegisterWidget(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if(password !== repeatPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        });

        const data = await res.json();
        if(res.ok) {
            setMessage('Registration successful!');
        } else {
            setMessage('Registration failed!!!!');
        }
    };
    return (
        <form onSubmit={handleSubmit}  className="bg-gray-700 rounded-xl shadow-xl p-3 lg:w-1/4  md:w-1/2 sm:w-full xs: w-full mx-auto text-white">
                <div className="bg-gray-800 rounded-tr-xl rounded-tl-xl rounded-bl-lg rounded-br-lg border-b-10 border-b-gray-600">
                    <div className="py-6 px-4 sm:px-8 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            
                            <div>
                                <h1 className="text-white text-5xl sm:text-5xl font-semibold leading-tight">
                                New Account
                                </h1>
                                <p className="text-cyan-400 text-sm sm:text-base">Create a new account to keep track of your games</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
                </div>
                <div>
                    
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
                </div>
                <div>
                    
                    <input type="password" id="repeatPassword" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Repeat Password" required />
                </div>
                <div>
                    
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E-Mail" required />
                </div>
                <div className="mt-2">
                    <button type="submit" id="submit" className="text-gray-900 text-3xl w-full bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                     Sign Up
                    </button>
                </div>
                <div className="mt-2 mb-7 justify-center text-center">
                    <a href="#" className="font-medium text-white over:underline hover:text-cyan-300 mx-auto">Forgot Username</a> |
                    <a href="#" className="font-medium text-white over:underline hover:text-cyan-300">Forgot Password</a> | 
                     <a href="/login" className="font-medium text-white over:underline hover:text-cyan-300">Login</a>
                </div>
             </form>
    );
}