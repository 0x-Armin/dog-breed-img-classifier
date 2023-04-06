import { useState } from "react";

export default function DogBreedClassifier() {
  const [imageData, setImageData] = useState(null);
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageData(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    const response = await fetch(
      "https://0xarmin-fastai-dog-breed-classifier.hf.space/run/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [imageData],
        }),
      }
    );

    const data = await response.json();
    const breed = data.data[0].label;
    setResult(breed);
    setIsProcessing(false);
  };

  return (
    <div id="classify-container">
      <form id="form" onSubmit={handleFormSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imageData && <img id="img-container" src={imageData} alt="uploaded" />}
        <button type="submit" disabled={!imageData}>
          {isProcessing ? "Processing..." : "Classify Dog Breed"}
        </button>
      </form>

      {result && (
        <p>
          Predicted dog breed: <strong>{result}</strong>
        </p>
      )}
    </div>
  );
}
