import { memo } from "react";

const Models = () => {
  return (
    <div className="w-90vw h-[70vh] flex flex-col md:flex-row items-center justify-center overflow-hidden  pt-0 p-0  justify-items-center gap-4 m-4" >
      
      <div className="w-full md:w-auto h-1/2 md:h-full flex items-center justify-center  rounded-lg overflow-hidden">
        <img
          src="4.png"
          className="w-full h-full object-contain"
          alt=""
        />
      </div>

      <div className="w-full md:w-auto h-1/2 md:h-full flex items-center justify-center  rounded-lg overflow-hidden">
        <img
          src="1.jpg"
          className="w-full h-full object-contain"
          alt=""
        />
      </div>

    </div>
  );
};

export default memo(Models);