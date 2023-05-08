import { useEffect, useRef, useState } from "react";
import Button from "components/atoms/button";

const AudioWebm = () => {
  const [permission, setPermission] = useState<boolean>(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recording, setRecording] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | undefined>();
  const [audio, setAudio] = useState<string | undefined>(undefined);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    getPermission().then((stream) => {
      setPermission(true);
      setStream(stream);
    });
  }, []);

  const getPermission = async () => {
    try {
      return await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      alert("Permission denied");
    }
  };

  const startRecording = () => {
    if (!stream) return;
    setRecording(true);
    setAudio(undefined);
    mediaRecorder.current = new MediaRecorder(stream, {
      mimeType: "audio/webm",
    });
    mediaRecorder.current.start();
    const localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) return;
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob: Blob = new Blob(audioChunks, {
        // type: isMp3 ? "audio/mpeg" : "audio/webm",
        type: "audio/webm",
      });
      const audioUrl: string = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
    setRecording(false);
  };

  const handleDownload = () => {
    setAudio(undefined);
  };

  const handleAudioRecord = () => {
    return recording ? stopRecording() : startRecording();
  };

  return (
    <div>
      <div>Webm</div>
      <div style={{ display: "flex", gap: "20px" }}>
        <Button
          onClick={handleAudioRecord}
          type={recording ? "play" : "pause"}
          disabled={!permission}
        >
          {recording ? "Stop" : "Start"}
        </Button>
        {audio ? (
          <a href={audio} download>
            <Button download onClick={handleDownload} disabled={!permission}>
              Download
            </Button>
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default AudioWebm;
