import React from 'react';

const RewardPopup = ({ rewardMessage, onClose }) => {
    if (!rewardMessage) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-md text-center">
                <h2 className="text-lg font-bold mb-4">🎉 Congratulations!</h2>
                <p>{rewardMessage}</p>
                <button onClick={onClose} className="mt-4 p-2 bg-blue-500 text-white">
                    Close
                </button>
            </div>
        </div>
    );
};

export default RewardPopup;
