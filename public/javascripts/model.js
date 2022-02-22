/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
class Contact {
  constructor(obj) {
    this.id = obj.id;
    this.full_name = obj.full_name;
    this.email = obj.email;
    this.phone_number = obj.phone_number;
    this.tags = obj.tags;
  }

  json() {
    return JSON.stringify(this);
  }

  formatForTemplate() {
    let clone = JSON.parse(JSON.stringify(this));
    clone.tags = clone.tags ? clone.tags.split(',') : ["empty"];
    return clone;
  }
}

export default class Model {
  constructor() {
    this.contacts = [];
  }

  bindContactsChanged(callback) {
    this.onContactsChanged = callback;
  }

  _commit(contacts) {
    this.onContactsChanged(contacts);
  }

  _addToLocalFromServer(obj) {
    this.contacts.push(new Contact(obj));
  }

  _addToLocalFromForm(contactInstance) {
    this.contacts.push(contactInstance);
  }

  _removeContactFromLocal(id) {
    this.contacts.splice(this.contacts.findIndex(contact => {
      return contact.id === id;
    }), 1);
  }

  _swapContactWithUpdate(id, newObj) {
    this.contacts.splice(this.contacts.findIndex(contact => {
      return contact.id === id;
    }), 1, newObj);
  }

  _formatPhoneNumber(string) {
    const regex = /[0-9]/g;
    const digits = string.match(regex);
    return digits.join('');
  }

  _formatFormData(formData) {
    let contactData = {};
    formData.forEach((value, key) => {
      if (key in contactData) {
        contactData[key] += `,${value}`;
      } else if (key === 'phone_number') {
        contactData[key] = this._formatPhoneNumber(value);
      } else {
        contactData[key] = value;
      }
    });

    contactData.id = this.contacts.length > 0 ?
      this.contacts[this.contacts.length - 1].id + 1 : 1;

    return new Contact(contactData);
  }

  getLocalContactNames(queryString) {
    let contacts = this.contacts;
    return contacts.filter(contact => contact.full_name
      .toLowerCase().includes(queryString));
  }

  getLocalContactData(id) {
    let localObj = this.contacts.find(obj => obj.id === id);
    return localObj.formatForTemplate();
  }

  putContactToServer(id, formData) {
    let localObj = this.contacts.find(obj => obj.id === id);
    let localObjClone = new Contact(JSON.parse(JSON.stringify(localObj)));
    let newData = this._formatFormData(formData);

    for (let prop in newData) {
      localObjClone[prop] = newData[prop];
    }

    let request = new XMLHttpRequest();
    request.open('PUT', `http://localhost:3000/api/contacts/${id}`);
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send(localObjClone.json());

    request.addEventListener('load', () => {
      if (request.status === 201) {
        alert("Contact Updated Successfully");
        this._swapContactWithUpdate(localObj.id, new Contact(localObjClone));
        this._commit(this.contacts);
      } else {
        alert("Something went wrong. Please Try Again Later.");
      }
    });
  }

  postContactToServer(formData) {
    let contactObj = this._formatFormData(formData);

    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/api/contacts');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send(contactObj.json());

    request.addEventListener('load', () => {
      if (request.status === 201) {
        alert("Contact Saved Successfully");
        this._addToLocalFromForm(contactObj);
        this._commit(this.contacts);
      } else {
        alert("Something went wrong. Please Try Again Later.");
      }
    });
  }

  deleteContactFromServer(id) {
    let request = new XMLHttpRequest();
    request.open('DELETE', `http://localhost:3000/api/contacts/${id}`);
    request.send();

    request.addEventListener('load', () => {
      if (request.status === 204) {
        alert("Contact Deleted Successfully");
        this._removeContactFromLocal(id);
        this._commit(this.contacts);
      } else {
        alert("Something went wrong. Please Try Again Later.");
      }
    });
  }

  getContactsFromServer() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/api/contacts');
    request.responseType = 'json';
    request.send();

    request.addEventListener('load', () => {
      if (request.status === 200) {
        let contactsData = request.response;

        contactsData.forEach(contact => {
          this._addToLocalFromServer(contact);
        });

        this._commit(this.contacts);
      } else {
        alert("Something went wrong. Please try again later");
      }
    });
  }
}

