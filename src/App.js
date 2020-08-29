import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    fetchRepositories();
  }, []);

  async function fetchRepositories() {
    const response = await api.get('/repositories');
    setRepositories(response.data);
  }

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      url: "https://github.com/Rocketseat/reactor",
      title: `Reactor ${Date.now()}`,
      techs: ["React", "Axios", "TypeScript"]
    });

    setRepositories([ ...repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
