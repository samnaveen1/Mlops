import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [filePath, setFilePath] = useState('"D:/diabetes.csv"');
  const [xFeatures, setXFeatures] = useState({
    Age: '',
    Glucose: '',
    Blood_Pressure: '',
    Skin_Thickness: '',
    Insulin: '',
    BMI: '',
    Pregnancies: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleFilePathChange = (event) => {
    setFilePath(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setXFeatures({ ...xFeatures, [name]: value });
  };

  const handlePredict = () => {
    // Check if all required features have input
    const emptyFeatures = Object.values(xFeatures).filter((value) => !value);
    if (emptyFeatures.length > 0) {
      setError(`Please enter values for all features: ${emptyFeatures.join(', ')}`);
      return;
    }

    const formData = new FormData();
    formData.append('filePath', filePath);
    formData.append('xFeatures', JSON.stringify(xFeatures)); // Convert to JSON for sending

    axios.defaults.baseURL = 'http://127.0.0.1:8000';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    
    const fetchData = async () => {
      try {
          const response = await axios.get('http://127.0.0.1:8000/predict');
          setPrediction(response.data.prediction);
          setError(null);
      } catch (error) {
        setPrediction(null);
        setError(error.message);
      }
    };

    fetchData();

//    axios.post('http://127.0.0.1:8000/predict', formData)
//      .then(response => {
//        setPrediction(response.data.prediction);
//        setError(null);
//      })
//      .catch(error => {
//        setPrediction(null);
//        setError(error.message);
//     });
  };

  return (
    <div className="container">
      <h1>Diabetes Prediction</h1>
      {/* Input field for file path */}
      <input type="text" placeholder="Enter file path" value={filePath} onChange={handleFilePathChange} />

      {/* Input fields for X features */}
      <div className="input-container">
        <h2>Enter X Features:</h2>
        {Object.entries(xFeatures).map(([key, value]) => (
          <div key={key} className="feature-row">
            <label htmlFor={key}>{key.replace(/_/g, ' ')}:</label>
            <input
              type="number"
              id={key}
              name={key}
              value={value}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </div>

      {/* Prediction button */}
      <button onClick={handlePredict}>Predict</button>

      {/* Display prediction result */}
      {prediction !== null && <p>{prediction}</p>}

      {/* Display error message if any */}
      {error && <p>Error: {error}</p>}
    </div>
  );
}


export default App;