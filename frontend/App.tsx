import * as React from "react";
import './App.scss';
import ArticleUpload from "./UploadArticle";

function App() {
  const url = `http://localhost:8080/upload`;
  return (
    <div className="App">
      <header className="App-header">
        <p>DocuDecode: Simplifying Documents for Everyone</p>
      </header>
    <ArticleUpload uploadEndpoint={url}/>
    </div>
  );
}

export default App;
