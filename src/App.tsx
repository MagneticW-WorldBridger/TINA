// App.tsx
import { useRef, useState } from "react";
import "./App.scss";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import { Altair } from "./components/altair/Altair";
import ControlTray from "./components/control-tray/ControlTray";
import cn from "classnames";
import { VoiceAssistant } from './components/voice-assistant/VoiceAssistant';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return (
    <div className="App overlay-container">
      <LiveAPIProvider url={uri} apiKey={API_KEY}>
        {/* Mantener Altair pero invisible */}
        <div style={{ display: 'none' }}>
          <Altair />
        </div>
        
        <video
          className={cn("stream", {
            hidden: !videoRef.current || !videoStream,
          })}
          ref={videoRef}
          autoPlay
          playsInline
        />
        
        <ControlTray
          videoRef={videoRef}
          supportsVideo={true}
          onVideoStreamChange={setVideoStream}
        />
        <VoiceAssistant />
      </LiveAPIProvider>
    </div>
  );
}

export default App;