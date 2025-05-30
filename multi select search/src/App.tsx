import { useEffect, useState } from "react";
import "./App.css";
import Pill from "./components/Pill";
type userType = {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  id: number;
};

function App() {
  const [search, setSearch] = useState("");
  const [suggesstions, setSuggestions] = useState<userType[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<userType[]>([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  useEffect(() => {
    if (search.trim() === "") return;
    if (search.trim() === "" && suggesstions.length > 0) {
      setSuggestions([]);
      return;
    }
    const fetchUsers = () => {
      fetch(`https://dummyjson.com/users/search?q=${search}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data.users))
        .catch((err) => console.log(err));
    };
    fetchUsers();
  }, [search]);

  const handleSelectUser = (user: userType) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearch("");
    setSuggestions([]);
  };

  const handleRemoveUser = (user: userType) => {
    const updatedUsers = selectedUsers.filter((item) => item.id !== user.id);
    setSelectedUsers(updatedUsers);
    const updatedUsersSet = new Set(selectedUsers);

    updatedUsersSet.delete(user.email);
    selectedUserSet(updatedUsersSet);
  };

  const handleKeyDown = (e: any) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    }
  };

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {/* pills component */}
        {selectedUsers.map((user) => {
          return (
            <Pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
          );
        })}
        {/* input with suggesstion */}
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
            onKeyDown={handleKeyDown}
          />
          {/* search suggestion */}
          {suggesstions.length > 0 && (
            <ul className="suggestions-list">
              {suggesstions?.map((item) => {
                return !selectedUserSet.has(item.email) ? (
                  <li key={item.email} onClick={() => handleSelectUser(item)}>
                    <img
                      src={item.image}
                      alt={`${item.firstName} ${item.lastName}`}
                    />
                    <span>
                      {item.firstName}
                      {item.lastName}
                    </span>
                  </li>
                ) : (
                  <></>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
