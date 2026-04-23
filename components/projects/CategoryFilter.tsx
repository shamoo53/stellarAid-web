'use client';

import React, { useState, useEffect } from 'react';

export interface CategoryOption {
  id: string;
  label: string;
  count: number;
  icon?: React.ReactNode;
}

export interface CategoryFilterProps {
  categories: CategoryOption[];
  selectedCategories: string[];
  onSelectionChange: (categories: string[]) => void;
  maxItems?: number;
  showAllOption?: boolean;
  allOptionLabel?: string;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onSelectionChange,
  maxItems = 5,
  showAllOption = true,
  allOptionLabel = 'All',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedCategories, setDisplayedCategories] = useState<CategoryOption[]>(categories);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    setDisplayedCategories(categories);
    setShowAll(true);
  }, [categories]);

  const toggleCategory = (categoryId: string) => {
    if (categoryId === 'all' && showAll) {
      // If 'All' is selected, deselect all others
      onSelectionChange(['all']);
      setShowAll(true);
    } else if (categoryId === 'all') {
      // If 'All' is deselected, show all categories
      onSelectionChange([]);
      setShowAll(false);
    } else {
      const newSelection = selectedCategories.includes(categoryId)
        ? selectedCategories.filter(id => id !== categoryId)
        : [...selectedCategories, categoryId];
      
      onSelectionChange(newSelection);
      
      // If we deselect a category while 'All' is selected, deselect 'All'
      if (showAll && newSelection.length > 0) {
        setShowAll(false);
      }
    }
  };

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') {
      return categories.reduce((sum, cat) => sum + cat.count, 0);
    }
    const category = categories.find(c => c.id === categoryId);
    return category?.count || 0;
  };

  const filteredCategories = showAll 
    ? displayedCategories
    : displayedCategories.filter(cat => cat.id !== 'all');

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-wrap gap-2">
        {showAllOption && (
          <button
            onClick={() => toggleCategory('all')}
            className={`
              px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
              ${showAll 
                ? 'bg-primary-50 border border-primary-200 text-primary-700 shadow-sm'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300'
              }
            `}
          >
            {allOptionLabel} ({getCategoryCount('all')})
          </button>
        )}
        
        {filteredCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`
              px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
              ${selectedCategories.includes(category.id)
                ? 'bg-primary-50 border border-primary-200 text-primary-700 shadow-sm'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300'
              }
            `}
          >
            {category.icon && <span className="mr-1">{category.icon}</span>}
            {category.label} ({category.count})
          </button>
        ))}
      </div>
      
      {categories.length > maxItems && !showAll && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          {isOpen ? 'Show less' : `Show ${categories.length - maxItems} more`}
        </button>
      )}
      
      {!showAll && isOpen && (
        <div className="mt-2 p-3 bg-white border border-neutral-200 rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-2">
            {categories.filter(cat => cat.id !== 'all').map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                  ${selectedCategories.includes(category.id)
                    ? 'bg-primary-50 border border-primary-200 text-primary-700 shadow-sm'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300'
                  }
                `}
              >
                {category.icon && <span className="mr-1">{category.icon}</span>}
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;