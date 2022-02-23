/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
const searchEvent = new CustomEvent('search');

export default class View {
  constructor() {
    this.queryString = '';
    this.listDiv = document.querySelector('.contacts');
    this.addContactBtn = document.querySelector('.add-contact');
    this.modalOuter = document.querySelector('.modal-outer');
    this.emptyDiv = document.querySelector('.empty');
    this.searchBar = document.querySelector('.search');
    this.tags = ["family", "friend", "work", "school"];
  }

  _clearSearchBar() {
    this.searchBar.value = '';
    this.queryString = '';
  }

  modalExitListener() {
    this.modalOuter.addEventListener('click', event => {
      const isOutside = !event.target.closest('.modal-inner');
      if (isOutside) {
        this.modalOuter.classList.remove('open');
      }
    });

    window.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        let modalOuter = document.querySelector('.modal-outer');
        modalOuter.classList.remove('open');
      }
    });
  }

  bindAddContact(callback) {
    this.addContactBtn.addEventListener('click', () => {
      let formHtml = Handlebars.templates.form();
      this.modalOuter.innerHTML = formHtml;

      let tagsHtml = Handlebars.templates.tagOptions({tags: this.tags});
      let formTagOptions = document.querySelector('#tag-options');
      formTagOptions.innerHTML = tagsHtml;

      this.modalOuter.classList.add('open');
      const newContactForm = document.querySelector('#contact-form');

      newContactForm.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation();

        let formData = new FormData(newContactForm);
        callback(formData);
        this._clearSearchBar();
        setTimeout(() => {
          this.modalOuter.classList.remove('open');
        }, 1000);
      });
    });
  }

  bindDeleteContact(callback) {
    this.listDiv.addEventListener('click', event => {
      if (event.target.classList.contains('delete-btn')) {
        let contactID = parseInt(event.target.parentElement.id, 10);
        let result = window.confirm("Are you sure you want to delete this contact?");
        if (result) {
          callback(contactID);
          this._clearSearchBar();
        }
      }
    });
  }

  bindEditContact(callback1, callback2) {
    let contactID = null;
    this.listDiv.addEventListener('click', event => {
      if (event.target.classList.contains('edit-btn')) {
        contactID = parseInt(event.target.parentElement.id, 10);
        let contactData = callback1(contactID);
        let formHtml = Handlebars.templates.form(contactData);
        this.modalOuter.innerHTML = formHtml;

        let tagsHtml = Handlebars.templates.tagOptions({tags: this.tags});
        let formTagOptions = document.querySelector('#tag-options');
        formTagOptions.innerHTML = tagsHtml;

        contactData.tags.forEach(tag => {
          let optionElement = document.getElementById(tag);
          if (optionElement) {
            optionElement.setAttribute('selected', true);
          }
        });

        this.modalOuter.classList.add('open');
      } else return;

      const editContactForm = document.querySelector('#contact-form');
      editContactForm.addEventListener('submit', event => {
        event.preventDefault();
        let formData = new FormData(editContactForm);
        callback2(contactID, formData);
        this._clearSearchBar();
        setTimeout(() => {
          this.modalOuter.classList.remove('open');
        }, 1000);
      });
    });
  }

  bindSearchMatches(callback) {
    let matchingContacts = [];
    this.searchBar.addEventListener('keydown', event => {
      console.log(this.queryString);

      if ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode === 32 || event.keyCode === 51) {
        this.queryString += event.key.toLowerCase();
        matchingContacts = callback(this.queryString);
      } else if (event.keyCode === 8) {
        this.queryString = this.queryString.slice(0, this.queryString.length - 1);
        matchingContacts = callback(this.queryString);
      } else return;
      this.displayContacts(matchingContacts);
    });

    this.searchBar.addEventListener('search', event => {
      this.queryString = event.target.value;
      matchingContacts = callback(this.queryString);
      this.displayContacts(matchingContacts);
    });
  }

  tagLinkListener() {
    this.listDiv.addEventListener('click', event => {
      if (event.target.tagName === 'A' && event.target.textContent !== '#empty') {
        let searchTag = event.target.textContent.trim();
        this.searchBar.value = `${searchTag}`;
        this.searchBar.dispatchEvent(new Event("search"));
        this.searchBar.focus();
      }
    });
  }

  displayContacts(contacts) {
    while (this.listDiv.children.length > 0) {
      this.listDiv.removeChild(this.listDiv.firstChild);
    }

    if (contacts.length > 0) {
      contacts.forEach(contact => {
        let contactHtml = Handlebars.templates.
          contact(contact.formatForTemplate());

        let contactDiv = document.createElement('div');
        contactDiv.innerHTML = contactHtml;
        this.listDiv.appendChild(contactDiv);
      });
      this.emptyDiv.classList.add('hidden');
    } else {
      this.emptyDiv.classList.remove('hidden');
    }
    // console.log(contacts); // DEBUGGING
  }
}