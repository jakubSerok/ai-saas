"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, Upload, X } from "lucide-react";
import { filesize } from "filesize";

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setError(null);

    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError(`File size exceeds ${filesize(MAX_FILE_SIZE)} limit`);
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!file) {
      setError("Please select a video file");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      const response = await axios.post("/api/video-upload", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || error.message || "Upload failed";
      setError(errorMessage);
      console.log(error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="card bg-slate-800 shadow-2xl border border-slate-700">
          <div className="card-body">
            <h1 className="card-title text-3xl font-bold mb-2 text-white">
              Upload Video
            </h1>
            <p className="text-slate-300 mb-6">
              Share your videos with unlimited compression
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Alert */}
              {error && (
                <div className="alert alert-error bg-red-900/50 border border-red-700 text-white">
                  <AlertCircle size={24} />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Alert */}
              {success && (
                <div className="alert alert-success bg-green-900/50 border border-green-700 text-white">
                  <CheckCircle size={24} />
                  <span>Video uploaded successfully! Redirecting...</span>
                </div>
              )}

              {/* Title Input */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold text-white">
                    Video Title *
                  </span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered w-full focus:input-primary bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Enter video title"
                  disabled={isUploading}
                  required
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold text-white">
                    Description
                  </span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="textarea textarea-bordered w-full focus:textarea-primary bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Enter video description (optional)"
                  disabled={isUploading}
                  rows={4}
                />
              </div>

              {/* File Input */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold text-white">
                    Video File *
                  </span>
                  <span className="text-xs text-slate-400">
                    Max {filesize(MAX_FILE_SIZE)}
                  </span>
                </label>
                {!file ? (
                  <label className="border-2 border-dashed border-blue-500 rounded-lg p-8 cursor-pointer hover:bg-blue-500/10 transition-colors bg-slate-700/50">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <div className="flex flex-col items-center justify-center text-center">
                      <Upload size={48} className="text-blue-400 mb-2" />
                      <p className="font-semibold text-white">
                        Drag and drop your video here
                      </p>
                      <p className="text-sm text-slate-400">
                        or click to select a file
                      </p>
                    </div>
                  </label>
                ) : (
                  <div className="border-2 border-green-500 rounded-lg p-4 bg-green-900/20">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-green-400 mb-1 truncate">
                          {file.name}
                        </p>
                        <p className="text-sm text-slate-300">
                          {filesize(file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        disabled={isUploading}
                        className="btn btn-ghost btn-sm btn-circle flex-shrink-0 text-white hover:bg-slate-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={uploadProgress}
                    max="100"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full text-lg"
                disabled={isUploading || !file || !title.trim()}
              >
                {isUploading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Upload Video
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;
