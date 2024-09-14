import React, { useState } from 'react';

const HabitList = ({ habits, onUpdateHabit, onDeleteHabit, onCompleteHabit }) => {
    const [selectedHabit, setSelectedHabit] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState(''); // State to handle warning messages

    // Effect to clear warning message after 5 seconds
    React.useEffect(() => {
        if (warningMessage) {
            const timer = setTimeout(() => {
                setWarningMessage(''); // Clear the warning message after 5 seconds
            }, 5000);
            return () => clearTimeout(timer); // Cleanup the timer on component unmount or warningMessage change
        }
    }, [warningMessage]);

    const handleUpdateClick = (habit) => {
        setSelectedHabit(habit);
        setIsUpdateModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedHabit(null);
        setIsUpdateModalOpen(false);
    };

    const handleHabitUpdate = (updatedHabit) => {
        onUpdateHabit(updatedHabit);
        handleModalClose();
    };

    const handleCompleteClick = (habit) => {
        // Check if the habit is already completed today
        const today = new Date().toDateString();
        if (habit.status.some(date => new Date(date).toDateString() === today)) {
            setWarningMessage("You can't complete this habit more than once a day!"); // Set warning message
        } else {
            onCompleteHabit(habit._id);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md">
            <h2 className="text-lg mb-4">Your Habits</h2>
            <ul>
                {habits.map((habit) => (
                    <li
                        key={habit._id}
                        className={`flex justify-between items-center mb-4 p-2 border-b ${habit.reward ? 'text-green-500' : ''}`} // Change text color to green if habit is completed
                    >
                        <span>{habit.name}</span>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleUpdateClick(habit)}
                                className="p-2 bg-yellow-500 text-white"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => onDeleteHabit(habit._id)}
                                className="p-2 bg-red-500 text-white"
                            >
                                🗑️
                            </button>
                            <button
                                onClick={() => handleCompleteClick(habit)} // Updated to handle completion
                                className="p-2 bg-green-500 text-white"
                            >
                                ✔️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {warningMessage && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-4 rounded">
                    {warningMessage} {/* Display warning message */}
                </div>
            )}

            {isUpdateModalOpen && selectedHabit && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-4">Update Habit</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const updatedHabit = {
                                    _id: selectedHabit._id,
                                    name: formData.get('name'),
                                    targetDays: parseInt(formData.get('targetDays')),
                                    rewardType: formData.get('rewardType'),
                                    streak: selectedHabit.streak // Include current streak count
                                };
                                handleHabitUpdate(updatedHabit);
                            }}
                        >
                            <div className="mb-4">
                                <label className="block mb-1">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={selectedHabit.name}
                                    className="w-full p-2 border"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Target Days:</label>
                                <input
                                    type="number"
                                    name="targetDays"
                                    defaultValue={selectedHabit.targetDays}
                                    className="w-full p-2 border"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Reward Type:</label>
                                <input
                                    type="text"
                                    name="rewardType"
                                    defaultValue={selectedHabit.rewardType}
                                    className="w-full p-2 border"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Current Streak:</label>
                                <input
                                    type="text"
                                    value={selectedHabit.streak}
                                    className="w-full p-2 border bg-gray-100"
                                    readOnly // Make streak count read-only
                                />
                            </div>
                            <button type="submit" className="p-2 bg-blue-500 text-white">Update Habit</button>
                            <button
                                type="button"
                                onClick={handleModalClose}
                                className="p-2 bg-red-500 text-white ml-2"
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HabitList;
