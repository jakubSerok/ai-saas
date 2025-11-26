"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types";
import { AlertCircle, RotateCw } from "lucide-react";

function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      setError(null);
      const response = await axios.get("/api/videos");
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message || "Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.mp4`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleRetry = () => {
    setLoading(true);
    fetchVideos();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-white">Videos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card bg-base-100 shadow-xl animate-pulse">
                <div className="aspect-video bg-base-300" />
                <div className="card-body">
                  <div className="h-6 bg-base-300 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-base-300 rounded w-full mb-4" />
                  <div className="h-4 bg-base-300 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">Videos</h1>
          <p className="text-slate-300">
            {videos.length === 0
              ? "No videos yet"
              : `${videos.length} video${
                  videos.length !== 1 ? "s" : ""
                } uploaded`}
          </p>
        </div>

        {error && (
          <div className="alert alert-error mb-6 bg-red-900/50 border border-red-700 text-white">
            <AlertCircle size={24} />
            <div>
              <h3 className="font-bold">Failed to load videos</h3>
              <p className="text-sm">{error}</p>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={handleRetry}>
              <RotateCw size={18} />
              Retry
            </button>
          </div>
        )}

        {videos.length === 0 ? (
          <div className="card bg-slate-800 shadow-xl border border-slate-700">
            <div className="card-body text-center py-16">
              <h2 className="text-2xl font-bold mb-2 text-white">
                No Videos Yet
              </h2>
              <p className="text-slate-300 mb-6">
                Start by uploading your first video
              </p>
              <a
                href="/video-upload"
                className="btn btn-primary w-full sm:w-auto"
              >
                Upload Your First Video
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
