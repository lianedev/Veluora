import { memo } from 'react';

const Call = () => {
  return (
    <div className="flex items-center justify-center   bg-transparent m-[-8]">
     <div className="bg-red-500 text-3xl text-white px-4 py-2 rounded-md">Shop Now</div>
    </div>
  );
};

export default memo(Call);