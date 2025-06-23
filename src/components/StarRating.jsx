import React from "react";

const Stars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const Star = ({ type }) => {
    const baseClasses = "w-4 h-4 text-yellow-400";

    if (type === "full") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={baseClasses}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.013 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z" />
        </svg>
      );
    }

    if (type === "half") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={baseClasses}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.013 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z"
            fill="url(#halfGrad)"
          />
          <path
            d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.013 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      );
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={baseClasses}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.013 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z" />
      </svg>
    );
  };

  return (
    <div className="flex items-center space-x-1 leading-none">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} type="full" />
      ))}
      {hasHalfStar && <Star type="half" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} type="empty" />
      ))}
    </div>
  );
};

export default Stars;
