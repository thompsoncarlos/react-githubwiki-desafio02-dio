import { useState } from "react";
import gitLogo from "../assets/github.png";
import Input from "../components/Input";
import ItemRepo from "../components/ItemRepo";
import { Container } from "./styles";
import Button from "../components/Button";
import { api } from "../services/api";

function App() {
  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`);
    
    if (data.id) {
      const isExist = repos.find(repo => repo.id === data.id);
      
      if(!isExist) {
        setRepos((prev) => [...prev, data]);
        setCurrentRepo('');
        return 
      }
      alert('Repositório não encontrado')
    }
  };
  
  const handleRemoveRepo = (id) => {
    setRepos(prevRepo => prevRepo.filter(repo => repo.id !== id));
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="Logo github" />
      <Input value={currentRepo} onChange={e => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map((repo) => (
        <ItemRepo repo={repo} handleRemoveRepo={handleRemoveRepo} />
      ))}
    </Container>
  );
}

export default App;
