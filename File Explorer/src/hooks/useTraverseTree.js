const useTraverseTree = () => {


    const insertNode = function (tree, folderId, item, isFolder) {
      
      if (tree.id === folderId && tree.isFolder) {
        tree.items.unshift({
          id: new Date().getTime(),
          name: item,
          isFolder: isFolder,
          items: [],
        });
        return tree;
      }
  
      let latestNode = [];
      latestNode = tree.items.map((obj) => {
        return insertNode(obj, folderId, item, isFolder);
      });
      return { ...tree, items: latestNode };
    };
  
    const deleteNode = function (tree, folderId, isFolder) {
      if (tree.id === folderId) {
        return null;
      }
  
      let latestNode = [];
      latestNode = tree.items
        .filter((obj) => obj.id !== folderId)
        .map((obj) => {
          return deleteNode(obj, folderId, isFolder);
        });
      return { ...tree, items: latestNode };
    };
  
    const updateNode = (tree, folderId, item) => {
      console.log("asas", folderId);
      if (tree.id === folderId) {
        tree.name = item;
        return tree;
      }
  
      let updatedTree = [];
      updatedTree = tree.items.map((obj) => {
        return updateNode(obj, folderId, item);
      });
  
      return { ...tree, items: updatedTree };
    };
  
    return { insertNode, deleteNode, updateNode };
  };
  
  export default useTraverseTree;
  