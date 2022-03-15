import { v4 as uuidv4 } from "uuid";

const idOne = uuidv4();
const idTwo = uuidv4();

let users = {
  [idOne]: {
    id: idOne,
    firstName: "Robin",
    lastName: "Wieruch",
    isDeveloper: true
  },
  [idTwo]: {
    id: idTwo,
    firstName: "Dave",
    lastName: "Davddis",
    isDeveloper: false
  }
};

export const getUsers = () =>
  new Promise((resolve, reject) => {
    if (!users) {
      return setTimeout(() => reject(new Error("No users found !")), 250);
    }
    setTimeout(() => resolve(Object.values(users)), 250);
  });

export const getUser = (id) =>
  new Promise((resolve, reject) => {
    const user = users[id];
    if (!user) {
      return setTimeout(() => reject(new Error("No user found !")), 250);
    }
    setTimeout(() => resolve(users[id]), 250);
  });

export const createUser = (data) =>
  new Promise((resolve, reject) => {
    if (!data.firstName || !data.lastName || !data.isDeveloper) {
      setTimeout(() => reject(new Error("Missing information !")), 250);
    }
    const id = uuidv4();
    const newUser = { id, ...data };
    users = { ...users, [id]: newUser };

    setTimeout(() => resolve(newUser), 250);
  });

export const updateUser = (id, data) =>
  new Promise((resolve, reject) => {
    const user = users[id];
    if (!user) {
      return setTimeout(() => reject(new Error("No user found !")), 250);
    }
    users[id] = { ...users[id], ...data };
    return setTimeout(() => resolve(users[id]), 250);
  });

export const deleteUser = (id) =>
  new Promise((resolve, reject) => {
    const { [id]: user, ...rest } = users;

    if (!user) {
      return setTimeout(() => reject(new Error("User not found")), 250);
    }
    users = { ...rest };
    return setTimeout(() => resolve(true), 250);
  });
