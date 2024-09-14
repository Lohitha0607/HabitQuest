function checkFrequency(lastCompletedDate, currentDate, frequency) {
  if (!lastCompletedDate) return true; // No previous completion, allow it

  const lastDate = new Date(lastCompletedDate);
  const currentDateObj = new Date(currentDate);

  console.log("Last Completed Date:", lastDate);
  console.log("Current Date:", currentDateObj);

  // Prevent multiple completions on the same day
  if (lastDate.toDateString() === currentDateObj.toDateString()) {
      return false; // Habit was already completed today, don't allow streak update
  }

  if (frequency === "daily") {
      return currentDateObj.getTime() > lastDate.getTime(); // Ensure it's after the last completion date
  } else if (frequency === "weekly") {
      const diffInDays = (currentDateObj - lastDate) / (1000 * 60 * 60 * 24);
      return diffInDays >= 7;
  }
  // Add more conditions for other frequencies if needed
  return false;
}

module.exports = { checkFrequency };

