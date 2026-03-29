import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/goals" element={<Goals />} />
    <Route path="/goals/new" element={<NewGoal />} />
    <Route path="/goals/:id" element={<GoalDetails />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>;
