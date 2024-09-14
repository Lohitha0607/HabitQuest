const express = require("express");
const { authmiddleware } = require("../middleware");
const { fetchAIMessage } = require("./rewards");
const router = express.Router();
const z = require("zod");
const { Habit } = require("../db");
const { checkFrequency } = require("../checkfrequency");

// Schemas for validation
const addschema = z.object({
    name: z.string().min(1, "Habit name is required"),
    targetDays: z.number().int().positive("Target days must be a positive integer"),
    rewardType: z.string().min(1, "Reward type is required"),
    streak: z.number().int().nonnegative().default(0), 
    startDate: z.string().optional().default(() => new Date().toISOString()), 
    frequency: z.string().optional().default('daily')
});

const updatehabitschema = z.object({
    name: z.string().min(1).optional(),
    targetDays: z.number().int().positive().optional(),
    rewardType: z.string().min(1).optional(),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }).optional(),
    frequency: z.string().optional(),
    streak: z.number().int().nonnegative().optional(),
});

const completeHabitSchema = z.object({
    habitid: z.string().min(1, "Habit ID is required"),  
    dateCompleted: z.string().optional().default(() => new Date().toISOString()), 
});

// Routes
router.get("/habits", authmiddleware, async (req, res) => {
    try {
        const userid = req.userid;
        const habits = await Habit.find({ userid });
        res.status(200).json({ habits: habits || [] });
    } catch (e) {
        res.status(500).json({ msg: 'Error retrieving habits', error: e.message });
    }
});

router.post("/add", authmiddleware, async (req, res) => {
    const habitbody = req.body;
    const parsedhabitbody = addschema.safeParse(habitbody);

    if (!parsedhabitbody.success) {
        return res.status(400).json({ msg: "Invalid inputs for adding habits" });
    }

    try {
        habitbody.userid = req.userid;
        const newhabit = await Habit.create(habitbody);
        res.json({ msg: "New habit created", habitid: newhabit._id });
    } catch (e) {
        res.status(500).json({ msg: "Failed to create new habit", error: e.message });
    }
});

router.put("/", authmiddleware, async (req, res) => {
    const { habitid, ...updatebody } = req.body;

    if (!habitid) {
        return res.status(400).json({ msg: "Habit ID is required to update the habit" });
    }

    const parsedupdatebody = updatehabitschema.safeParse(updatebody);

    if (!parsedupdatebody.success) {
        return res.status(400).json({ msg: "Invalid inputs, unable to update" });
    }

    try {
        const updatedHabit = await Habit.updateOne({ _id: habitid }, updatebody);

        if (updatedHabit.nModified === 0) {
            return res.status(404).json({ msg: "Habit not found or no changes made" });
        }

        res.json({ msg: "Updated successfully" });
    } catch (e) {
        res.status(500).json({ msg: "Error while updating", error: e.message });
    }
});

router.put("/complete", authmiddleware, async (req, res) => {
    const parsedData = completeHabitSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({ msg: "Invalid inputs for completing habit", errors: parsedData.error.errors });
    }

    const { habitid, dateCompleted } = parsedData.data;

    try {
        const habit = await Habit.findById(habitid);

        if (!habit) {
            return res.status(404).json({ msg: "Habit not found" });
        }

        // Convert dateCompleted to a Date object
        const dateCompletedObj = new Date(dateCompleted);
        console.log("Date Completed:", dateCompletedObj);

        // Check frequency
        const lastCompletedDate = habit.status[habit.status.length - 1];
        const isValidStreak = checkFrequency(lastCompletedDate, dateCompletedObj, habit.frequency);

        console.log("Is Valid Streak:", isValidStreak);

        if (isValidStreak) {
            // Update habit streak and status
            habit.streak += 1;
            habit.status.push(dateCompleted); // Add the completion date

            // Check if the streak meets the target
            if (habit.streak >= habit.targetDays) {
                const reward = await fetchAIMessage(habit.name, habit.targetDays, habit.rewardType);
                habit.reward = reward;
                await habit.save();

                return res.status(200).json({
                    msg: `Congratulations! You've completed ${habit.targetDays} days of ${habit.name}! Here's your reward: ${reward}`
                });
            } else {
                await habit.save();
                return res.status(200).json({ msg: `You've completed another day of ${habit.name}. Keep going!` });
            }
        } else {
            return res.status(400).json({ msg: "Streak invalid based on frequency" });
        }
    } catch (e) {
        console.error('Error updating habit:', e); // Added error logging
        return res.status(500).json({ msg: "Error updating habit", error: e.message });
    }
});

router.delete('/', authmiddleware, async (req, res) => {
    const { habitid } = req.body;

    if (!habitid) {
        return res.status(400).json({ msg: 'Habit ID is required' });
    }

    try {
        const result = await Habit.findByIdAndDelete(habitid);

        if (!result) {
            return res.status(404).json({ msg: 'Habit not found' });
        }

        res.status(200).json({ msg: 'Habit deleted successfully' });
    } catch (e) {
        res.status(500).json({ msg: 'Error deleting habit', error: e.message });
    }
});

module.exports = router;
