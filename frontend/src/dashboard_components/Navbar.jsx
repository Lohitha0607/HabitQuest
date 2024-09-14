import React, { useState, useEffect } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid'; // Importing coin-like icon
import axios from 'axios';

const Navbar = ({ coins, onRewardClick }) => {
    const [username, setUserName] = useState(''); // State to hold the user's name

    // Fetch user details after component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token"); // Get the token from localStorage
                const response = await axios.get("http://localhost:3000/api/v1/user/user", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token for authorization
                    },
                });
                setUserName(response.data.username); // Set the user's name in state
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails(); // Call the function to fetch user details
    }, []); // Empty dependency array means this runs once on mount

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            {/* Display user's name */}
            <div className="flex items-center">
                <span className="text-lg">Hello {username}</span> {/* Display fetched userName */}
            </div>
            
            {/* Centered project name */}
            <div className="text-center">
                <span className="text-2xl font-bold">HabitQuest</span>
            </div>

            <div className="relative">
                <button onClick={onRewardClick} className="flex items-center">
                    {/* Display coin icon and number of coins */}
                    <CurrencyDollarIcon className="w-8 h-8 text-yellow-400" />
                    <span className="ml-2">{coins} Coins</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
