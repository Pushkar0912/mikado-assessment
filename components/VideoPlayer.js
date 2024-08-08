'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import gsap from 'gsap';

const VideoPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef(null);
    const containerRef = useRef(null);

    const handleMouseMove = (event) => {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left; 
        const y = event.clientY - rect.top; 

        const moveX = (x / rect.width) * 20 - 10;
        const moveY = (y / rect.height) * 20 - 10; 
        gsap.to(playerRef.current.getInternalPlayer(), {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: 'power3.out',
        });
    };

    const handleMouseEnter = () => {
        setIsPlaying(true);
        gsap.to(containerRef.current, {
            duration: 0.8,
            scale: 0.95,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        gsap.to(playerRef.current.getInternalPlayer(), {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power3.out',
        });
        gsap.to(containerRef.current, {
            duration: 0.8,
            scale: 1,
            ease: "power3.out",
        });
        playerRef.current.seekTo(0);
    };

    useEffect(() => {
        return () => {
            gsap.killTweensOf(containerRef.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}
        >
            <ReactPlayer
                ref={playerRef}
                url="//videos.ctfassets.net/9uhkiji6mhey/25X5ckHruKF6vRVbKpzNXq/4e068357baf17214e2fc59b98632d1bc/Thumbnail_-_Video_-_Portrait_-_Big.mp4"
                muted
                playing={isPlaying}
                loop
                playsinline
                width="100%"
                height="100%"
                playbackRate={2}
            />
        </div>
    );
};

export default VideoPlayer;
