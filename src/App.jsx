import React, { useState, useEffect } from "react";
import AddPhoto from "./components/AddPhoto";
import PhotoGallery from "./components/PhotoGallery";
import PhotoDetail from "./components/PhotoDetail";

function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("photos");
    if (saved) setPhotos(JSON.parse(saved));
  }, []);

  const savePhotos = (updated) => {
    setPhotos(updated);
    localStorage.setItem("photos", JSON.stringify(updated));
  };

  return (
    <div className="app-container">
      <h1>📸Photo Book</h1>
      {selectedPhoto ? (
        <PhotoDetail
          photo={selectedPhoto}
          onBack={() => setSelectedPhoto(null)}
          onUpdate={(updated) => {
            const newList = photos.map((p) =>
              p.id === updated.id ? updated : p
            );
            savePhotos(newList);
            setSelectedPhoto(updated);
          }}
          onDelete={(id) => {
            const newList = photos.filter((p) => p.id !== id);
            savePhotos(newList);
            setSelectedPhoto(null);
          }}
        />
      ) : (
        <>
          <AddPhoto
            onAdd={(newPhoto) => {
              const newList = [newPhoto, ...photos];
              savePhotos(newList);
            }}
          />
          <PhotoGallery photos={photos} onSelect={setSelectedPhoto} />
        </>
      )}
    </div>
  );
}

export default App;
