import { useEffect, useState } from "react";
import { Recorder } from "vmsg";
import Button from "components/atoms/button";

const AudioMp3 = () => {
  const [permission, setPermission] = useState<boolean>(false);
  const [recording, setRecording] = useState<boolean>(false);
  const [audio, setAudio] = useState<string | undefined>(undefined);
  const [recorder, setRecorder] = useState<Recorder | undefined>();

  useEffect(() => {
    getPermission().then(() => {
      setPermission(true);
      setRecorder(
        new Recorder({
          wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm",
        })
      );
    });
  }, []);

  const getPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      alert("Permission denied");
    }
  };

  const startRecording = async () => {
    setAudio(undefined);
    try {
      await recorder?.initAudio();
      await recorder?.initWorker();
      recorder?.startRecording();
      setRecording(true);
    } catch (e) {
      console.log(e);
    }
  };

  const stopRecording = async () => {
    try {
      const blob: Blob = (await recorder?.stopRecording()) as Blob;
      setAudio(URL.createObjectURL(blob));
      setRecording(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDownload = () => {
    setAudio(undefined);
  };

  const handleAudioRecord = () => {
    return recording ? stopRecording() : startRecording();
  };

  return (
    <div>
      <div>Mp3</div>
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

export default AudioMp3;
