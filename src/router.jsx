import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import GoalsList from './pages/GoalsList';
import NewGoal from './pages/NewGoal';
import GoalDetails from './pages/GoalDetails';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/goals" element={<GoalsList />} />
      <Route path="/goals/new" element={<NewGoal />} />
      <Route path="/goals/:id" element={<GoalDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouterConfig;
