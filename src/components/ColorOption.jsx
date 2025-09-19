import { memo } from 'react';

/**
 * ColorOption component for product color selection
 * Memoized to prevent unnecessary re-renders
 */
export const ColorOption = memo(function ColorOption({
  color,
  imageUrl,
  isSelected,
  productName,
  onColorSelect,
}) {
  return (
    <img
      src={imageUrl}
      className={`mx-auto aspect-square h-10 w-10 cursor-pointer rounded-full object-cover ${
        isSelected
          ? 'border-2 border-blue-500 shadow-md'
          : 'border border-gray-200'
      }`}
      alt={`${productName} - Color ${color.name}`}
      loading='lazy'
      onClick={() => onColorSelect(color)}
    />
  );
});
