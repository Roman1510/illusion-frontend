import React, { useState, useRef } from 'react'
import './App.css'

const App = () => {
  const [frontImage, setFrontImage] = useState<File | null>(null)
  const [sideImage, setSideImage] = useState<File | null>(null)
  const [mergedPreview, setMergedPreview] = useState<{
    front: File | null
    side: File | null
  }>({ front: null, side: null })

  const frontInputRef = useRef<HTMLInputElement | null>(null)
  const sideInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setImage(file)
      setMergedPreview({ front: null, side: null })
    }
  }

  const handleDeleteImage = (
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    setImage(null)
    setMergedPreview({ front: null, side: null })
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleUpload = () => {
    if (frontImage && sideImage) {
      setMergedPreview({ front: frontImage, side: sideImage })
    }
  }

  return (
    <div className="App">
      <h1>Image Merge App</h1>
      <div className="main-layout">
        <div className="upload-section">
          <div className="paper image-section">
            <h3>Front Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setFrontImage)}
              disabled={!!frontImage}
              ref={frontInputRef}
            />
            {frontImage && (
              <div className="image-preview-container">
                <img
                  src={URL.createObjectURL(frontImage)}
                  alt="Front Preview"
                  className="uploaded-image"
                />
                <button
                  className="delete-button"
                  onClick={() =>
                    handleDeleteImage(setFrontImage, frontInputRef)
                  }
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <div className="paper image-section">
            <h3>Side Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setSideImage)}
              disabled={!!sideImage}
              ref={sideInputRef}
            />
            {sideImage && (
              <div className="image-preview-container">
                <img
                  src={URL.createObjectURL(sideImage)}
                  alt="Side Preview"
                  className="uploaded-image"
                />
                <button
                  className="delete-button"
                  onClick={() => handleDeleteImage(setSideImage, sideInputRef)}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <button
            className="upload-button"
            onClick={handleUpload}
            disabled={!frontImage || !sideImage}
          >
            Upload
          </button>
        </div>
        <div className="paper merged-section">
          <h3>Merged Image Preview</h3>
          {mergedPreview.front && mergedPreview.side ? (
            <div className="merged-preview">
              <img
                src={URL.createObjectURL(mergedPreview.front)}
                alt="Front Merged Preview"
                className="merged-image"
              />
              <img
                src={URL.createObjectURL(mergedPreview.side)}
                alt="Side Merged Preview"
                className="merged-image"
              />
            </div>
          ) : (
            <div className="placeholder">
              Merged image preview will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
