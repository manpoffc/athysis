import React from 'react';

const ShimmerLoader = () => {

      return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="loader ease-linear border-8 border-t-8 h-16 w-16 animate-pulse rounded-full"></div>
        </div>
      );
    };
    

export default ShimmerLoader;
