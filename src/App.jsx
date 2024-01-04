import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.scss'

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/users')
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des données", error);
    });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <h1>Données reçues du serveur</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App
