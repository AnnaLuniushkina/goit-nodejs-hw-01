const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

// Розкоментуйте і запиши значення
const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));

// TODO: задокументувати кожну функцію
async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const id = String(contactId);
  const result = contacts.find(item => item.id === id);
  return result || null;
}

async function addContact({name, email, phone}) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  // додаємо новостворений об'єкт в масив
  contacts.push(newContact);
  // і повністю перезаписуємо масив
  await updateContacts(contacts);
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const id = String(contactId);
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
}