import "./index.css";
import Folder from "./Component/Folder";
import explorer from "./data/folderData.js";
import useTraverseTree from "./hooks/useTraverseTree";
import { useState } from "react";
export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, deleteNode, updateNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const newTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(newTree);
  };

  const handleDeleteNode = (folderId, isFolder) => {
    const newTree = deleteNode(explorerData, folderId, isFolder);
    setExplorerData(newTree);
  };

  const handleUpdateNode = (folderId, item) => {
    console.log(folderId);
    const newTree = updateNode(explorerData, folderId, item);
    setExplorerData(newTree);
  };

  return (
    <div className="App">
      <Folder
        data={explorerData}
        handleDeleteNode={handleDeleteNode}
        handleInsertNode={handleInsertNode}
        handleUpdateNode={handleUpdateNode}
      />
    </div>
  );
}
