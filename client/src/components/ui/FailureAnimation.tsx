import { useState, useEffect } from 'react';
import failureGif from '../../assets/failure.gif';
import failureStatic from '../../assets/failureLastFrame.gif';

const FailureAnimation = () => {
  const [showStatic, setShowStatic] = useState(false);

  const gifDuration = 1010;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStatic(true);
    }, gifDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <img
      src={showStatic ? failureStatic : failureGif}
      alt="Failure animation"
      className="w-24 h-24 mb-4"
    />
  );
};

export default FailureAnimation;
