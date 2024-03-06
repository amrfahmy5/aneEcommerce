import React, { useState } from "react";

const ChatWidget = () => {
  const [showButtons, setShowButtons] = useState(false);

  const handleMainButtonClick = () => {
    setShowButtons((prevShowButtons) => !prevShowButtons);
  };

  const handleWhatsAppButtonClick = () => {
    const whatsappNumber = "+201121833830";
    window.location.href = `https://wa.me/${whatsappNumber}`;
  };

  const handleCallButtonClick = () => {
    const callNumber = "+201121833830";
    window.location.href = `tel:${callNumber}`;
  };

  return (
    <div id="chat-widget">
        {showButtons && (
        <>
          <button id="whatsapp-button"  className="chat-button" onClick={handleWhatsAppButtonClick}>
          <i class="fa-brands fa-whatsapp"></i>
          </button>
          <button id="call-button"  className="chat-button" onClick={handleCallButtonClick}>
            <i className="fa fa-phone"></i>
          </button>
        </>
      )}
      <button id="main-button" className="chat-button" onClick={handleMainButtonClick}>
        <i class="fa-solid fa-headset"></i>
      </button>
    </div>
  );
};


export default ChatWidget;
