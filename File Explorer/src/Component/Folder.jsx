/* eslint-disable react/prop-types */
import { useState } from "react";

const Folder = ({
  data,
  handleDeleteNode = () => {},
  handleInsertNode = () => {},
  handleUpdateNode = () => {},
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleDeleteFolder = (e, folderId) => {
    e.stopPropagation();
    handleDeleteNode(folderId, data.isFolder);
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(data.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleRename = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({
      visible: true,
      isFolder,
    });
  };
  const onUpdateFolder = (e) => {
    e.stopPropagation();
    if (e.keyCode === 13 && e.target.value) {
      console.log("asad", data.id);
      
      handleUpdateNode(data.id, e.target.value);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (data && data.isFolder) {
    return (
      <>
        <div
          className="folder"
          onClick={() => setExpand(!expand)}
          key={data.id}
          style={{ marginTop: "5px" }}
        >
          <div>
            📁{" "}
            {showInput.visible ? (
              <input
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="inputContainer__input"
                autoFocus
                onKeyDown={onUpdateFolder}
              />
            ) : (
              data.name
            )}
          </div>
          <div>
            <button type="button" onClick={(e) => handleNewFolder(e, true)}>
              Folder +
            </button>
            <button type="button" onClick={(e) => handleNewFolder(e, false)}>
              File +
            </button>
            <button
              type="button"
              onClick={(e) => handleDeleteFolder(e, data.id)}
            >
              Delete
            </button>
            <button type="button" onClick={(e) => handleRename(e, true)}>
              Rename
            </button>
          </div>
        </div>

        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
              />
            </div>
          )}
          {data.items.map((item) => (
            <Folder
              key={item.id}
              data={item}
              handleInsertNode={handleInsertNode}
              handleUpdateNode={handleUpdateNode}
              handleDeleteNode={handleDeleteNode}
            />
          ))}
        </div>
      </>
    );
  } else if (data && data.isFolder === false) {
    return (
      <>
        <div className="file">
          📝
          {showInput.visible ? (
            <input
              onBlur={() => setShowInput({ ...showInput, visible: false })}
              className="inputContainer__input"
              autoFocus
              onKeyDown={onUpdateFolder}
            />
          ) : (
            data.name
          )}
        </div>
        <button type="button" onClick={(e) => handleDeleteFolder(e, data.id)}>
          Delete
        </button>
        <button type="button" onClick={(e) => handleRename(e, false)}>
          Rename
        </button>
      </>
    );
  }
};
export default Folder;
