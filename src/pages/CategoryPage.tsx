import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CATEGORIES_DATA, getProductsByCategory } from '../data/products';
import { CategoryKey } from '../types';
import { CategoryTemplate } from '../components/category/CategoryTemplate';

interface CategoryPageProps {
  explicitCategory?: CategoryKey;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ explicitCategory }) => {
  const { categoryKey } = useParams<{ categoryKey: string }>();

  const resolvedCategory = (explicitCategory || categoryKey) as CategoryKey;

  const categoryInfo = CATEGORIES_DATA[resolvedCategory];

  if (!categoryInfo) {
    return <Navigate to="/store" replace />;
  }

  const products = getProductsByCategory(resolvedCategory);

  return (
    <CategoryTemplate
      categoryInfo={categoryInfo}
      products={products}
    />
  );
};
