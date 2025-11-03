'use client'

import DecryptedText from '@/components/banner/DecryptedText';
import './loading.css';

const Loading = () => {
  return (
    <div className="relative">
      <div className="absolute mix-blend-overlay top-0 left-0 z-0 w-full">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="loadingContainer flex justify-center items-center min-h-screen">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
        <div className="content">
          <div className="loading-text">
            <DecryptedText text="Loading..." animateOn="view" sequential />
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </div >

  );
};

export default Loading;
