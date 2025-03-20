import React from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const PostDetailModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Post Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div>
          {post.media.map((media) => (
            <div key={media.id} className="mb-4">
              {media.mediaType.startsWith("image") ? (
                <img
                  src={media.mediaUrl}
                  alt="Post media"
                  className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
                />
              ) : (
                <video
                  src={media.mediaUrl}
                  controls
                  className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
                />
              )}
            </div>
          ))}
          <div className="mt-4">
            <p className="text-sm md:text-base">{post.description}</p>
            <div className="flex gap-4 mt-4">
              <button className="flex items-center gap-1">
                <FaHeart size={20} /> {post.likes || 0}
              </button>
              <button className="flex items-center gap-1">
                <FaComment size={20} /> {post.comments || 0}
              </button>
              <button className="flex items-center gap-1">
                <FaShare size={20} /> {post.shares || 0}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;