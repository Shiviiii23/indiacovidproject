import React, {useState, useEffect} from 'react';
function App() {
  const [requests, setRequests] = useState(false);
  useEffect(() => {
    getRequest();
  }, []);
  function getRequest() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setRequests(data);
      });
  }
  function createRequest() {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');
    fetch('http://localhost:3001/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getRequest();
      });
  }
  function deleteRequest() {
    let id = prompt('Enter request id');
    fetch(`http://localhost:3001/requests/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getRequest();
      });
  }
  return (
    <div>
      {requests ? requests : 'There is no merchant data available'}
      <br />
      <button onClick={createRequest}>Add request</button>
      <br />
      <button onClick={deleteRequest}>Delete request</button>
    </div>
  );
}
export default App;