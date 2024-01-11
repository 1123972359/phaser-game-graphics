import type { FC } from "react";
import { useEffect, useRef } from "react";
import { GameInit } from "./game";
import "./App.css";

const HomeView: FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const game = new GameInit({ parent: parentRef.current as HTMLElement });

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <>
      <div className="home" ref={parentRef}></div>
    </>
  );
};

export default HomeView;
