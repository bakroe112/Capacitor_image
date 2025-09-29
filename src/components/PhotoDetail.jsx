import React, { useState } from "react";
import { Share } from "@capacitor/share";

function PhotoDetail({ photo, onBack, onUpdate, onDelete }) {
  const [editTitle, setEditTitle] = useState(photo.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleShare = async () => {
    await Share.share({
      title: editTitle,
      text: "Xem ảnh này!",
      //   url: photo.path,
      files: [photo.path],
    });
  };

  return (
    <div className="detail">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="input-edit"
          />
          <button
            className="btn-edit"
            onClick={() => {
              onUpdate({ ...photo, title: editTitle });
              setIsEditing(false);
            }}
          >
            Lưu
          </button>
        </>
      ) : (
        <h2>{photo.title}</h2>
      )}
      <img src={photo.webPath} alt={photo.title} className="detail-img" />
      <div className="actions">
        <button onClick={onBack}>⬅ Quay lại</button>
        <button onClick={() => setIsEditing(!isEditing)}>✏ Sửa</button>
        <button onClick={() => onDelete(photo.id)}>🗑 Xoá</button>
        <button onClick={handleShare}>🔗 Chia sẻ</button>
      </div>
    </div>
  );
}

export default PhotoDetail;
