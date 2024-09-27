import { useState, useEffect } from 'react';
import successGif from '../../assets/success.gif';
import successStatic from '../../assets/SuccessLastFrame.gif';

const SuccessAnimation = () => {
  const [showStatic, setShowStatic] = useState(false);

  const gifDuration = 1510;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStatic(true);
    }, gifDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <img
      src={showStatic ? successStatic : successGif}
      alt="Success animation"
      className="w-32 h-32 mb-4"
    />
  );
};

export default SuccessAnimation;
