import React, { useState, useEffect, useCallback } from "react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { Download, Clock, FileDown, FileUp } from "lucide-react";
import dayjs from "dayjs";
import realtiveTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import { Video } from "@/types";

dayjs.extend(realtiveTime);

interface VideoCardProps {
  video: Video;
  onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldImageUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: "fill",
      gravity: "auto",
      format: "jpg",
      quality: "auto",
      assetType: "video",
    });
  }, []);

  const getFullVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 1920,
      height: 1080,
    });
  }, []);

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 400,
      height: 225,
      rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"],
    });
  }, []);

  const formatSize = useCallback((size: number) => {
    return filesize(size);
  }, []);

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
  );

  useEffect(() => {
    setPreviewError(false);
  }, [isHovered]);

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  return (
    <div
      className="card bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 border border-slate-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="aspect-video relative overflow-hidden bg-slate-700">
        {isHovered ? (
          previewError ? (
            <div className="w-full h-full flex items-center justify-center bg-slate-700">
              <p className="text-slate-400 text-center">Preview unavailable</p>
            </div>
          ) : (
            <video
              src={getPreviewVideoUrl(video.publicId)}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
              onError={handlePreviewError}
            />
          )
        ) : (
          <img
            src={getThumbnailUrl(video.publicId)}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-2 left-2 bg-slate-900 bg-opacity-80 px-3 py-1 rounded-full text-xs font-semibold flex items-center backdrop-blur-sm text-white">
          <Clock size={14} className="mr-1" />
          {formatDuration(video.duration)}
        </div>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold line-clamp-2 hover:text-blue-400 transition-colors text-white">
          {video.title}
        </h2>
        <p className="text-sm text-slate-300 mb-2 line-clamp-2">
          {video.description || "No description"}
        </p>
        <p className="text-xs text-slate-400 mb-4">
          Uploaded {dayjs(video.createdAt).fromNow()}
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="bg-slate-700 p-3 rounded-lg flex items-center">
            <FileUp size={18} className="mr-2 text-blue-400 flex-shrink-0" />
            <div>
              <div className="text-xs text-slate-400">Original</div>
              <div className="font-semibold text-white">
                {formatSize(Number(video.originalSize))}
              </div>
            </div>
          </div>
          <div className="bg-slate-700 p-3 rounded-lg flex items-center">
            <FileDown size={18} className="mr-2 text-green-400 flex-shrink-0" />
            <div>
              <div className="text-xs text-slate-400">Compressed</div>
              <div className="font-semibold text-white">
                {formatSize(Number(video.compressedSize))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="badge badge-accent badge-lg font-semibold">
            {compressionPercentage}% saved
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              onDownload(getFullVideoUrl(video.publicId), video.title)
            }
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
