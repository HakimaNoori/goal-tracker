import { createContext, useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';

const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [stats, setStats] = useState({
    xpTotal: 0,
    currentStreak: 0,
    completedCount: 0,
    lastActiveDate: null,
  });

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem('goals') || '[]');
    const savedStats = JSON.parse(localStorage.getItem('stats') || '{}');

    setGoals(savedGoals);
    setStats({
      xpTotal: savedStats.xpTotal || 0,
      currentStreak: savedStats.currentStreak || 0,
      completedCount: savedStats.completedCount || 0,
      lastActiveDate: savedStats.lastActiveDate || null,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
    localStorage.setItem('stats', JSON.stringify(stats));
  }, [goals, stats]);

  const addGoal = (newGoal) => {
    const goal = {
      id: Date.now().toString(),
      ...newGoal,
      progress: 0,
      status: 'active',
      logs: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setGoals((prev) => [...prev, goal]);
  };

  const updateGoal = (id, updatedData) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? { ...goal, ...updatedData, updatedAt: new Date().toISOString() }
          : goal,
      ),
    );
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const markProgress = (id, amount = 1) => {
    const today = dayjs().format('YYYY-MM-DD');

    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== id || goal.status !== 'active') return goal;

        let newProgress = goal.progress + amount;
        if (newProgress > goal.target) newProgress = goal.target;

        const isCompleted = newProgress >= goal.target;

        // Streak Logic
        let newStreak = stats.currentStreak;
        if (goal.type === 'daily') {
          const lastDate = stats.lastActiveDate;
          if (lastDate && dayjs(today).diff(dayjs(lastDate), 'day') === 1) {
            newStreak += 1;
          } else if (
            !lastDate ||
            dayjs(today).diff(dayjs(lastDate), 'day') > 1
          ) {
            newStreak = 1;
          }
        }

        // Update Stats
        setStats((prevStats) => ({
          ...prevStats,
          xpTotal: prevStats.xpTotal + 20,
          currentStreak: newStreak,
          lastActiveDate: today,
          completedCount: isCompleted
            ? prevStats.completedCount + 1
            : prevStats.completedCount,
        }));

        return {
          ...goal,
          progress: newProgress,
          status: isCompleted ? 'completed' : goal.status,
          logs: [...goal.logs, { date: today, amount, xpEarned: 20 }],
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  const togglePause = (id) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? { ...goal, status: goal.status === 'paused' ? 'active' : 'paused' }
          : goal,
      ),
    );
  };

  const value = {
    goals,
    stats,
    addGoal,
    updateGoal,
    deleteGoal,
    markProgress,
    togglePause,
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};

export const useGoals = () => useContext(GoalContext);
