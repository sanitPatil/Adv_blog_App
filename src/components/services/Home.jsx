import React from 'react';

function Home() {
  return (
    <div>
      <img
        src={'public/image.png'}
        className="w-full h-full object-cover border"
        alt="backgroundHome Image"
      />
      <div className="absolute text-white ml-20 top-[50%]">
        <p className="text-slate-100 text-3xl text-center animate-pulse italic ">
          We're excited to share insights, stories, and tips with you.
          <span className="underline font-bold">
            Dive in and explore our latest posts!
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;
