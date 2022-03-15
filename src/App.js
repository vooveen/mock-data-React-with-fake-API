import React from "react";

import { getUsers, createUser, updateUser, deleteUser } from "./api";

const getDeveloperText = (isDeveloper) =>
  `is ${isDeveloper ? "a" : "not a"} developer`;

const App = () => {
  const [users, setUsers] = React.useState(null);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const doCreateUser = await createUser({
        firstName,
        lastName,
        isDeveloper: true
      });
      console.log(doCreateUser);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (id) => {
    const user = users.find((user) => user.id === id);
    const isDeveloper = !user.isDeveloper;
    try {
      const doUpdateUser = await updateUser(id, { isDeveloper });
      console.log(doUpdateUser);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const doDeleteUser = await deleteUser(id);
      console.log(doDeleteUser);
    } catch (error) {}
  };

  React.useEffect(() => {
    const doGetUsers = async () => {
      try {
        const result = await getUsers();
        setUsers(result);
      } catch (error) {
        console.log(error);
      }
    };
    doGetUsers();
  }, [users]);

  if (!users) {
    return null;
  }
  return (
    <div>
      <ul>
        {users.map((user) => {
          const developerText = getDeveloperText(user.isDeveloper);
          return (
            <li key={user.id}>
              {user.firstName} {user.lastName} {developerText}
              <button type="button" onClick={() => handleEdit(user.id)}>
                Update
              </button>
              <button type="button" onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      <hr />
      <span>Create User:</span>
      <form onSubmit={handleCreate}>
        <label>
          First Name:
          <input type="input" onChange={handleChangeFirstName} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="input" onChange={handleChangeLastName} />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
      <hr />
    </div>
  );
};

export default App;
