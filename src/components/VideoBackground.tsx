"use client";

import React from 'react';
import styles from './VideoBackground.module.css';

interface VideoBackgroundProps {
  videoSrc: string;
  children: React.ReactNode;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoSrc, children }) => {
  return (
    <div className={styles.backgroundContainer}>
      <video
        autoPlay
        loop
        muted
        playsInline // Important for mobile playback
        className={styles.video}
        src={videoSrc}
      />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default VideoBackground; 