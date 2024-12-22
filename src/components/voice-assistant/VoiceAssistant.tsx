import { useState } from 'react';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';
import AudioPulse from '../audio-pulse/AudioPulse';
import './VoiceAssistant.scss';

export const VoiceAssistant = () => {
  const [isActive, setIsActive] = useState(false);
  const { connected, connect, disconnect, volume } = useLiveAPIContext();

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className={`voice-assistant ${connected ? 'connected' : ''}`}>
      <button 
        className={`assistant-button ${connected ? 'connected' : ''}`}
        onClick={handleClick}
        aria-label="Voice Assistant"
      >
        <img 
          src="https://storage.googleapis.com/msgsndr/0CdC4IwmbYxRqLRcGkB7/media/676748502fc1954b5549d68d.jpeg" 
          alt="AI Assistant"
        />
      </button>

      <div className={`pulse-container ${connected ? 'connected' : ''}`}>
        <AudioPulse 
          active={connected} 
          volume={volume}
          hover={isActive}
        />
      </div>
    </div>
  );
};
