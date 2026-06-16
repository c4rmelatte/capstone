import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const MODE = {
  POMODORO: "Pomodoro",
  SHORT_BREAK: "Short Break",
  LONG_BREAK: "Long Break",
} as const;

const TIMES = {
  [MODE.POMODORO]: 25 * 60,
  [MODE.SHORT_BREAK]: 5 * 60,
  [MODE.LONG_BREAK]: 15 * 60,
};

type ModeType = (typeof MODE)[keyof typeof MODE];

type PomodoroContextType = {
  mode: ModeType;
  secondsLeft: number;
  isRunning: boolean;
  setMode: (mode: ModeType) => void;
  toggle: () => void;
  reset: () => void;
};

const PomodoroContext = createContext<PomodoroContextType | null>(null);

export const PomodoroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setModeState] = useState<ModeType>(MODE.POMODORO);
  const [secondsLeft, setSecondsLeft] = useState(TIMES[MODE.POMODORO]);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);

  // Reset when mode changes
  const setMode = (newMode: ModeType) => {
    setModeState(newMode);
    setSecondsLeft(TIMES[newMode]);
    setIsRunning(false);
  };

  // Toggle play / pause
  const toggle = () => {
    setIsRunning((prev) => !prev);
  };

  // Manual reset
  const reset = () => {
    setSecondsLeft(TIMES[mode]);
    setIsRunning(false);
  };

  // Countdown logic
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  return (
    <PomodoroContext.Provider
      value={{
        mode,
        secondsLeft,
        isRunning,
        setMode,
        toggle,
        reset,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error("usePomodoro must be used inside PomodoroProvider");
  }
  return context;
};
