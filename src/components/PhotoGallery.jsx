import React from "react";

function PhotoGallery({ photos, onSelect }) {
  return (
    <div className="gallery">
      {photos.length === 0 && <p>Chưa có ảnh nào.</p>}
      {photos.map((p) => (
        <div key={p.id} className="photo-card" onClick={() => onSelect(p)}>
          <img src={p.webPath} alt={p.title} />
          <p>{p.title}</p>
        </div>
      ))}
    </div>
  );
}

export default PhotoGallery;
