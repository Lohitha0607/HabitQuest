import React, { useState } from 'react';

const AddHabitForm = ({ onAddHabit }) => {
    const [name, setName] = useState('');
    const [targetDays, setTargetDays] = useState('');
    const [rewardType, setRewardType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddHabit({ name, targetDays: parseInt(targetDays), rewardType });
        setName('');
        setTargetDays('');
        setRewardType('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-4 bg-gray-100 shadow-md">
            <h2 className="text-lg mb-2">Add New Habit</h2>
            <input
                type="text"
                placeholder="Habit Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 mb-2 border"
                required
            />
            <input
                type="number"
                placeholder="Target Days"
                value={targetDays}
                onChange={(e) => setTargetDays(e.target.value)}
                className="p-2 mb-2 border"
                required
            />
            <input
                type="text"
                placeholder="Reward Type"
                value={rewardType}
                onChange={(e) => setRewardType(e.target.value)}
                className="p-2 mb-2 border"
                required
            />
            <button type="submit" className="p-2 bg-blue-500 text-white">
                Add Habit
            </button>
        </form>
    );
};

export default AddHabitForm;
