import React, { useState, useEffect } from 'react';

const ShimmerTable = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const shimmerRows = Array(10).fill(null); // 10 rows for demonstration

  return (
    <table className="w-full border border-gray-200">
      <tbody>
        {shimmerRows.map((_, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
            } ${loading ? 'animate-pulse' : ''}`}
          >
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShimmerTable;
