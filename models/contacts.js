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
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const contact = data.filter((i) => {
    return i.id.toString() === contactId.toString();
  });
  if (contact[0]) {
    contact[0].name = newData.name;
    contact[0].email = newData.email;
    contact[0].phone = newData.phone;
    const newContacts = data.filter((i) => {
      return i.id.toString() !== contactId.toString();
    });
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
    await addContact(contact);
    return contact;
  }
  return { message: `Contact with id ${contactId} not found, try another!` };
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
