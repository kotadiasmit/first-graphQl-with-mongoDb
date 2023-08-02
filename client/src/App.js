import "./App.css";
import { useState } from "react";

function App() {
  const [myContent, setMy] = useState(null);
  const queryGraphQLServer = async () => {
    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: "{ todos { text, id, isChecked } }",
      }),
    });
    const data = await response.json();
    
    const {
      data: { todos },
    } = data;

    const myContent = JSON.stringify(data, null, 2);
    setMy(myContent);
  };

  queryGraphQLServer();
  return (
    <div className="App">
      <header className="App-header">{myContent}</header>
      
    </div>
  );
}

export default App;
