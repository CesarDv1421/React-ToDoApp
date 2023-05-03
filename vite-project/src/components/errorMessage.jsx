import React, { useState, useEffect } from 'react';

function Message({message}) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={`message ${showMessage ? 'show' : ''}`}>
      {message}
    </div>
  );
}

export default Message;
