/* eslint-disable max-lines-per-function */
export default class View {
  constructor() {
    this.listDiv = document.querySelector('.contacts');
    this.addContactBtn = document.querySelector('.add-contact');
    this.modalOuter = document.querySelector('.modal-outer');
    this.emptyDiv = document.querySelector('.empty');
  }

  bindModalExitListener() {
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
      this.modalOuter.classList.add('open');
      const newContactForm = document.querySelector('#contact-form');

      newContactForm.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation();

        let formData = new FormData(newContactForm);
        callback(formData);
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

        contactData.tags.forEach(tag => {
          let optionElement = document.getElementById(tag);
          optionElement.setAttribute('selected', true);
        });

        this.modalOuter.classList.add('open');
      }

      const editContactForm = document.querySelector('#contact-form');
      editContactForm.addEventListener('submit', event => {
        event.preventDefault();
        let formData = new FormData(editContactForm);
        callback2(contactID, formData);
        setTimeout(() => {
          this.modalOuter.classList.remove('open');
        }, 1000);
      });
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