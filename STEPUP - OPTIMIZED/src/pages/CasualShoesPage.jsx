import React from 'react';
import { CategoryPage } from './CategoryPage';

export const CasualShoesPage = () => {
  const casualSubcategories = [
    { id: 'slip-ons', label: 'Slip-ons' },
    { id: 'canvas-shoes', label: 'Canvas Shoes' },
    { id: 'everyday-casual', label: 'Everyday Casual' },
    { id: 'smart-casual', label: 'Smart Casual' },
  ];

  return (
    <CategoryPage
      categoryKey="casual-shoes"
      pageTitle="Casual Shoes & Canvas Slip-Ons"
      subtitle="Effortless 8 AM lecture slip-ons, classic canvas sneakers, penny loafers, and smart-casual derbys for college presentations and weekend dates."
      subcategories={casualSubcategories}
    />
  );
};
