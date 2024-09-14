import React, { useState, useEffect } from 'react';
import Navbar from '../dashboard_components/Navbar';
import AddHabitForm from '../dashboard_components/AddHabitForm';
import HabitList from '../dashboard_components/HabitList';
import SearchBar from '../dashboard_components/SearchBar';
import RewardPopup from '../dashboard_components/RewardPopup';
import axios from 'axios';

export const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const [filteredHabits, setFilteredHabits] = useState([]);
    const [coins, setCoins] = useState(0);
    const [rewardMessage, setRewardMessage] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetchHabits();
        fetchUserData();
    }, []);

    // Fetch user data to get name and coins
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/v1/user/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCoins(response.data.rewardCount);
            setUserName(response.data.name);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Fetch habits from the backend
    const fetchHabits = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/v1/habits/habits', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setHabits(response.data.habits);
            setFilteredHabits(response.data.habits);
        } catch (error) {
            console.error('Error fetching habits:', error);
        }
    };

    // Add a new habit
    const handleAddHabit = async (habit) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/v1/habits/add', habit, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchHabits(); // Refresh habits after adding
        } catch (error) {
            console.error('Error adding habit:', error);
        }
    };

    // Update an existing habit
    const handleUpdateHabit = async (updatedHabit) => {
        try {
            const token = localStorage.getItem('token');
            const { _id: habitid, ...updateData } = updatedHabit;
            await axios.put('http://localhost:3000/api/v1/habits/', { habitid, ...updateData }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchHabits(); // Refresh habits after update
        } catch (error) {
            console.error('Error updating habit:', error);
        }
    };

    // Delete a habit
    const handleDeleteHabit = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete('http://localhost:3000/api/v1/habits/', {
                data: { habitid: id },
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchHabits(); // Refresh habits after deletion
        } catch (error) {
            console.error('Error deleting habit:', error);
        }
    };

    // Mark a habit as complete and update coins
    const handleCompleteHabit = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const dateCompleted = new Date().toISOString(); // Current date in ISO format
            const response = await axios.put('http://localhost:3000/api/v1/habits/complete', { habitid: id, dateCompleted }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchHabits(); // Refresh habits after completion

            if (response.data && response.data.msg) {
                setRewardMessage(response.data.msg);

                // If the reward is achieved, add 1 coin
                setCoins(prevCoins => prevCoins + 1);
            }
        } catch (error) {
            console.error('Error completing habit:', error.response?.data?.msg || error.message);
        }
    };

    // Search habits based on query
    const handleSearch = (query) => {
        const filtered = habits.filter(habit => habit.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredHabits(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar userName={userName} coins={coins} onRewardClick={() => console.log("Show Rewards List")} />
            <div className="container mx-auto py-8">
                <SearchBar onSearch={handleSearch} />
                <div className="flex space-x-4">
                    <div className="w-1/3">
                        <AddHabitForm onAddHabit={handleAddHabit} />
                    </div>
                    <div className="w-2/3">
                        <HabitList
                            habits={filteredHabits}
                            onUpdateHabit={handleUpdateHabit}
                            onDeleteHabit={handleDeleteHabit}
                            onCompleteHabit={handleCompleteHabit}
                        />
                    </div>
                </div>
            </div>
            <RewardPopup rewardMessage={rewardMessage} onClose={() => setRewardMessage('')} />
        </div>
    );
};
