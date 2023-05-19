import React, { useState } from 'react';
var axios = require('axios');



function App() {
  const [inputText, setInputText] = useState('');
  const [jsonString, setJsonString] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleConvertToJson = async() => {
    console.log("here");
    try {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "sequence": `${inputText}`
      });
      
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
       
      fetch("http://Last-env.eba-2zttxjs2.us-west-2.elasticbeanstalk.com/sequence/", requestOptions)
        .then(response => response.text())
        .then(result => setJsonString((result)))
        .catch(error => console.log('error', error));
      
    } catch (error) {
      console.error('Error converting to JSON:', error);
      setJsonString('error');
    }
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleConvertToJson}>find</button>
      <div>
        <pre>{jsonString}</pre>
      </div>
    </div>
  );
}

export default App;
