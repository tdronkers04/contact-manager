/* eslint-disable max-len */
import Model from './model.js';
import View from './view.js';

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.onContactsChanged(this.model.contacts);
    this.view.modalExitListener();
    this.view.tagLinkListener();
    this.model.bindContactsChanged(this.onContactsChanged);
    this.view.bindAddContact(this.handleAddContact);
    this.view.bindDeleteContact(this.handleDeleteContact);
    this.view.bindEditContact(this.handleContactDisplay, this.handleEditContact);
    this.view.bindSearchMatches(this.handleSearchMatches);
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

  handleSearchMatches = (queryString) => {
    return this.model.getMatchingContacts(queryString);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new Controller();
  app.model.getContactsFromServer();
});