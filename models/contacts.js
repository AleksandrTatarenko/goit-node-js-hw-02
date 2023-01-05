const fs = require('fs').promises;
const path = require('node:path');

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  return data;
}

const getContactById = async (contactId) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const contact = data.filter((i) => {
    return i.id.toString() === contactId.toString();
  });
  return contact;
}

const removeContact = async (contactId) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const newContacts = data.filter((i) => {
    return i.id.toString() !== contactId.toString();
  });
  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
}

const addContact = async (contact) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const newContacts = [...data, contact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
  return contact;
}

const updateContact = async (contactId, newData) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const findIndex = contacts.findIndex((contact) => contact.id.toString() === contactId);
  if (findIndex !== -1) {
    contacts[findIndex] = { ...newData, contactId };
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
    return contacts[findIndex];
  } else {
    return null;
  };
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
