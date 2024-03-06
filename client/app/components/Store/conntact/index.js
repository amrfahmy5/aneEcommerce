import React, { useState } from "react";

const ChatWidget = () => {
  const [showButtons, setShowButtons] = useState(false);

  const handleMainButtonClick = () => {
    setShowButtons((prevShowButtons) => !prevShowButtons);
  };

  const handleWhatsAppButtonClick = () => {
    const whatsappNumber = "+201121833830";
    // window.location.href = `https://wa.me/${whatsappNumber}`;
    window.open(
      `https://wa.me/${whatsappNumber}`,
      '_blank' // <- This is what makes it open in a new window.
    );
  };

  const handleCallButtonClick = () => {
    const callNumber = "+201121833830";
    window.location.href = `tel:${callNumber}`;
  };
  const handleChatButtonClick = () => {
    window.location.href = `/support`;
  };

  return (
    <div id="chat-widget">
        {showButtons && (
        <>
        <button className="chat-button another-button" onClick={handleChatButtonClick}>
            <i className="fa-brands fa-rocketchat"></i>
          </button>
          <button className="chat-button another-button" onClick={handleWhatsAppButtonClick}>
          <i className="fa-brands fa-whatsapp"></i>
          </button>
          <button className="chat-button another-button" onClick={handleCallButtonClick}>
            <i className="fa-solid fa-phone-volume"></i>
          </button>
        </>
      )}
      <button id="main-button" className="chat-button" onClick={handleMainButtonClick}>
        <i className="fa-solid fa-headset"></i>
      </button>
    </div>
  );
};


export default ChatWidget;
