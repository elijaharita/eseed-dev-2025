"use client";

import styles from "./page.module.scss";

import * as React from "react";

export default function Page() {
  const miniPlayerRef = React.useRef<HTMLDivElement | null>(null);
  const videoId = "51ObpN09-rw";

  return (
    <div className={styles.root}>
      <div className={styles.miniPlayerBackground} ref={miniPlayerRef}>
        <DetachableYoutubeVideo
          videoId={videoId}
          miniPlayerRef={miniPlayerRef}
        />
      </div>
      <div className={styles.columns}>
        <div>
          <p>
            the building is not good right now. i will change the building
            system to allow parts to snap onto each other at predefined points
            to make building more intuitive.
          </p>
          <p>
            the old chunk manager used to flash a lot when loading in different
            lod for chunks so i took another crack at it and i was able to
            mostly fix it and clean up the code. the old code was abominable
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            neque ligula, viverra at erat eget, imperdiet vulputate lectus.
            Fusce euismod elementum eros, a dapibus velit accumsan vitae. In
            quis mauris commodo orci accumsan laoreet quis at risus. Aenean at
            pharetra diam. Cras vitae odio nec lacus pulvinar consequat a id
            dolor. Vivamus bibendum quis est a aliquet. In ligula quam, cursus
            sed lectus a, suscipit viverra lacus. Suspendisse ullamcorper eros
            ex, id malesuada tortor porta id. Donec volutpat at sem vel
            sagittis. Nulla vitae velit ut libero rhoncus porta. Nunc facilisis,
            lectus ac ultrices condimentum, est enim vulputate dui, at mollis
            leo justo at velit. Maecenas ac faucibus ligula. Ut magna mi,
            dapibus nec ipsum vel, finibus hendrerit nisi. Mauris a dui in
            sapien commodo finibus ut sit amet lectus.
          </p>
          <p>
            Fusce ornare et ipsum pharetra convallis. Nulla pellentesque velit
            in nulla semper euismod quis ac erat. Phasellus nec libero mattis,
            tristique nulla et, pulvinar neque. Nullam ac volutpat nisl, quis
            rhoncus magna. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Maecenas convallis, metus eget mattis interdum, purus
            velit tempus elit, ac faucibus tortor dolor nec lorem. Ut
            consectetur bibendum metus, eget semper quam elementum eu. Donec
            tempor leo ac enim ornare ullamcorper. Etiam accumsan nibh arcu, sit
            amet iaculis magna placerat at. Suspendisse malesuada enim tellus,
            ut tincidunt augue sodales vel. Sed ac ipsum porttitor, vehicula sem
            id, lacinia tortor. Phasellus lacus diam, convallis nec risus vitae,
            mollis efficitur augue. Etiam fringilla ultrices magna, dapibus
            sollicitudin sem dictum a. Integer scelerisque nibh vitae est
            consectetur, at ultricies ante sagittis.
          </p>
        </div>
        <div ref={miniPlayerRef}></div>
      </div>
    </div>
  );
}

interface DetachableVideoProps {
  videoId: string;
  miniPlayerRef: React.RefObject<HTMLDivElement | null>;
}

function DetachableYoutubeVideo({
  videoId,
  miniPlayerRef,
}: DetachableVideoProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isDetached, setIsDetached] = React.useState(false);
  const [miniPlayerRect, setMiniPlayerRect] = React.useState<{
    left: number;
    right: number;
  }>({ left: 0, right: 0 });

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsDetached(entry.intersectionRatio < 0.8);

        const rect = miniPlayerRef.current?.getBoundingClientRect();
        if (rect) setMiniPlayerRect({ left: rect.left, right: rect.right });
      },
      { threshold: [0, 0.5, 1] }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  let videoStyle: React.CSSProperties;

  if (isDetached) {
    const width = miniPlayerRect.right - miniPlayerRect.left;
    videoStyle = {
      position: "fixed",
      left: miniPlayerRect.left,
      top: 96,
      width,
      height: width * (9 / 16),
      zIndex: 100,
    };
  } else {
    videoStyle = {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
    };
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <iframe
        className={styles.video}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&controls=1&showinfo=0&rel=0&enablejsapi=1`}
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={videoStyle}
      />
    </div>
  );
}
