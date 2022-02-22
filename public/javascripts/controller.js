/* eslint-disable max-len */
import Model from './model.js';
import View from './view.js';

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.onContactsChanged(this.model.contacts);
    this.model.bindContactsChanged(this.onContactsChanged);
    this.view.bindModalExitListener();
    this.view.bindAddContact(this.handleAddContact);
    this.view.bindDeleteContact(this.handleDeleteContact);
    this.view.bindEditContact(this.handleContactDisplay, this.handleEditContact);
    // this.view.bindDisplayEditForm(this.handleContactDisplay);
  }

  onContactsChanged = (contacts) => {
    this.view.displayContacts(contacts);
  }

  handleAddContact = (formData) => {
    this.model.postContactToServer(formData);
  }

  handleDeleteContact = (id) => {
    this.model.deleteContactFromServer(id);
  }

  handleEditContact = (id, formData) => {
    this.model.putContactToServer(id, formData);
  }

  handleContactDisplay = (id) => {
    return this.model.getLocalContactData(id);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new Controller();
  app.model.getContactsFromServer();
});