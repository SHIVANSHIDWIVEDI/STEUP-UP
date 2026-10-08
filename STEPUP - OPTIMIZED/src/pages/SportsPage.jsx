import React from 'react';
import { CategoryPage } from './CategoryPage';

export const SportsPage = () => {
  const sportsSubcategories = [
    { id: 'running-shoes', label: 'Running Shoes' },
    { id: 'walking-shoes', label: 'Walking Shoes' },
    { id: 'gym-shoes', label: 'Gym & Training' },
  ];

  return (
    <CategoryPage
      categoryKey="sports-running"
      pageTitle="Sports & Running Shoes"
      subtitle="High-endurance campus runners, ultralight knit walking shoes, and flat-base gym training shoes for hostel workouts and sports courts."
      subcategories={sportsSubcategories}
    />
  );
};
