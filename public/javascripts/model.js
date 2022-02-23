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

  _formatPhoneNumber(digitStr) {
    let match = digitStr.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      let intlCode = (match[1] ? '+1' : '');
      return [intlCode, '(', match[2], ')', match[3], '-', match[4]].join('');
    }

    return digitStr;
  }

  formatForTemplate() {
    let clone = JSON.parse(JSON.stringify(this));
    clone.tags = clone.tags ? clone.tags.split(',') : ["empty"];
    clone.phone_number = this._formatPhoneNumber(clone.phone_number);
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

  _extractDigits(string) {
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
        contactData[key] = this._extractDigits(value);
      } else {
        contactData[key] = value;
      }
    });

    contactData.id = this.contacts.length > 0 ?
      this.contacts[this.contacts.length - 1].id + 1 : 1;

    if (!contactData.tags) {
      contactData.tags = null;
    }

    return new Contact(contactData);
  }

  getMatchingContacts(queryString) {
    let contacts = this.contacts;
    let matches;

    if (queryString.startsWith('#')) {
      matches = contacts.filter(contact => {
        return contact.tags ?
          contact.tags.includes(queryString.slice(1)) : false;
      });
    } else {
      matches = contacts.filter(contact => {
        return contact.full_name.toLowerCase().includes(queryString);
      });
    }

    return matches;
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
      if (prop !== 'id') {
        localObjClone[prop] = newData[prop]; // do not update id
      }
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
        console.log(request);
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

