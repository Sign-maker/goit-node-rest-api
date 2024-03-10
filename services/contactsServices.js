import { Contact } from "../models/Contact.js";

const listContacts = () => Contact.find({});

const getContactById = (contactId) => Contact.findById(contactId);

const addContact = (data) => Contact.create(data);

const removeContact = (contactId) => Contact.findByIdAndDelete(contactId);

const updateContact = (contactId, data) =>
  Contact.findByIdAndUpdate(contactId, data);

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
