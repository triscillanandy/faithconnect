import React from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const PostDetailModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Post Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div>
          {post.media.map((media) => (
            <div key={media.id} className="mb-4">
              {media.mediaType.startsWith("image") ? (
                <img
                  src={media.mediaUrl}
                  alt="Post media"
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <video
                  src={media.mediaUrl}
                  controls
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>
          ))}
          <div className="mt-4">
            <p>{post.description}</p>
            <div className="flex gap-4 mt-4">
              <button>
                <FaHeart size={24} /> {post.likes || 0}
              </button>
              <button>
                <FaComment size={24} /> {post.comments || 0}
              </button>
              <button>
                <FaShare size={24} /> {post.shares || 0}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;