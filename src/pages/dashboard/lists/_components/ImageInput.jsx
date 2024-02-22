import { useState } from "react";

function ImageInput({ onChange }) {
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    image: null,
  });

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (!selectedImage) {
      console.log("Aucune image sélectionnée.");
      return;
    }

    console.log("Selected image:", selectedImage);

    if (!(selectedImage instanceof Blob)) {
      console.error("Le fichier sélectionné n'est pas une image valide.");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    console.log("Object URL:", objectUrl);

    setImageUrl(objectUrl);
    setFormData({
      ...formData,
      image: selectedImage,
    });
    onChange(selectedImage);
  };

  const handleRemoveImage = (event) => {
    event.preventDefault();
    setImageUrl("");
    setFormData({
      ...formData,
      image: null,
    });
    console.log(formData);
  };

  return (
    <div className="file-input">
      <input
        type="file"
        id="fileInput"
        className="file-input__input"
        onChange={handleImageChange}
      />
      <label htmlFor="fileInput" className="file-input__label">
        <div className="file-input__icon">
          {imageUrl ? (
            <img src={imageUrl} alt="Selected" className="selected-image" />
          ) : (
            <i className="bi bi-camera"></i>
          )}
        </div>
        <span className="file-input__text">
          {imageUrl ? (
            <span className="btn-deleted">
               <i
              className="bi bi-x-circle close"
              onClick={(e) => handleRemoveImage(e)}
            ></i>
            </span>
         
            
          ) : (
            "Choisir une image"
          )}
        </span>
      </label>
    </div>
  );
}

export default ImageInput;
