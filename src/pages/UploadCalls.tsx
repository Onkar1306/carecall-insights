import { useState, useCallback } from "react";
import { Upload, FileAudio, X, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: "uploading" | "processing" | "done" | "error";
  progress: number;
}

const UploadCalls = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const simulateUpload = (file: File) => {
    const id = Math.random().toString(36).substring(7);
    const newFile: UploadedFile = {
      id,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      status: "uploading",
      progress: 0,
    };
    setFiles((prev) => [newFile, ...prev]);

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, status: "processing", progress: 100 } : f))
        );
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, status: "done" } : f))
          );
        }, 2000);
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress: Math.min(progress, 100) } : f))
        );
      }
    }, 500);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(simulateUpload);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(simulateUpload);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Upload Calls</h1>
        <p className="text-muted-foreground mt-1">Upload audio recordings for AI-powered analysis</p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative glass-card p-12 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer ${
          isDragging ? "border-primary/60 glow-primary" : ""
        }`}
      >
        {isDragging && (
          <div className="absolute inset-0 rounded-xl gradient-border" />
        )}
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Upload className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Drop audio files here
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Supports MP3, WAV, M4A, FLAC • Max 200MB per file
        </p>
        <label>
          <input type="file" multiple accept="audio/*" onChange={handleFileSelect} className="hidden" />
          <Button variant="outline" className="cursor-pointer" asChild>
            <span>Browse Files</span>
          </Button>
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Uploaded Files</h3>
          {files.map((file) => (
            <div key={file.id} className="glass-card p-4 flex items-center gap-4 animate-fade-in">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileAudio className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.size}</p>
                {file.status === "uploading" && (
                  <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {file.status === "uploading" && (
                  <span className="text-xs text-muted-foreground">{Math.round(file.progress)}%</span>
                )}
                {file.status === "processing" && (
                  <span className="flex items-center gap-1 text-xs text-warning">
                    <Loader2 className="w-3 h-3 animate-spin" /> Analyzing...
                  </span>
                )}
                {file.status === "done" && (
                  <span className="flex items-center gap-1 text-xs text-success">
                    <CheckCircle2 className="w-3 h-3" /> Complete
                  </span>
                )}
                <button onClick={() => removeFile(file.id)} className="p-1 hover:bg-muted rounded transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadCalls;
