import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
      setRemainingTime(timeout); // Reset remainingTime
    }, remainingTime);

    // Cleanup function to clear the timer when component unmounts or when timeout changes
    return () => clearTimeout(timer);
  }, [timeout, remainingTime, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) =>
        prevRemainingTime - 100 > 0 ? prevRemainingTime - 100 : 0
      );
    }, 100);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
