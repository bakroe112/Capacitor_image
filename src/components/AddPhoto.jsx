import React, { useState } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";

function AddPhoto({ onAdd }) {
  const [title, setTitle] = useState("");

  const takePhoto = async () => {
    try {
      //   const image = await Camera.getPhoto({
      //     resultType: CameraResultType.Uri,
      //     quality: 90,
      //   });
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        quality: 90,
        saveToGallery: true, // cho phép lưu thẳng vào thư viện
      });
      const newPhoto = {
        id: Date.now(),
        title: title || "Untitled",
        path: image.path, // <-- dùng path thay vì webPath
        webPath: image.webPath, // vẫn giữ nếu muốn hiển thị trong <img />
        date: new Date().toISOString(),
      };
      //   const newPhoto = {
      //     id: Date.now(),
      //     title: title || "Untitled",
      //     path: image.webPath,
      //     date: new Date().toISOString(),
      //   };

      onAdd(newPhoto);
      setTitle("");
    } catch (err) {
      alert("Camera error: " + err.message);
    }
  };

  return (
    <div className="add-photo">
      <input
        type="text"
        placeholder="Nhập tiêu đề..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={takePhoto}>📷 Chụp ảnh</button>
    </div>
  );
}

export default AddPhoto;
