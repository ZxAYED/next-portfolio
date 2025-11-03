'use client'
import TransparentButton from '@/components/shared/TransparentButton';
import Link from 'next/link';
import './not-found.css';

const NotFoundPage = () => {
  return (
    <div className="relative">
      <div className="absolute mix-blend-overlay top-0 left-0 z-0 w-full h-full">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="notFoundContainer flex justify-center items-center min-h-screen">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
        <div className="content">
          <h1 className="title">404</h1>
          <p className="subtitle">Lost in Space</p>
          <p className="message">You've ventured into uncharted territory.</p>
          <Link href="/" >
            <TransparentButton title="Back To Safety"></TransparentButton>
          </Link>
        </div>
      </div>
    </div >

  );
};

export default NotFoundPage;