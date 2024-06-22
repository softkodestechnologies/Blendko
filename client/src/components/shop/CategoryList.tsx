// components/CategoryList.tsx
import React from 'react';

interface CategoryListProps {
  selectedCategory: string | undefined;
  onCategorySelect: (category: string) => void;
}

const categories = ['Men', 'Women', 'Unisex', 'T-shirts', 'Dresses', 'Polo', 'Hand bags']; // Add more categories as needed

const CategoryList: React.FC<CategoryListProps> = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category} onClick={() => onCategorySelect(category)}>
            <a className={selectedCategory === category ? 'active' : ''}>{category}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
