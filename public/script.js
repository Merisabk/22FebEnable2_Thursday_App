`use strict`

// import the dom
import * as DOM from './dom.js';

// list item function
const writeItem = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `${JSON.stringify(item)}`;
  DOM.listOutput.appendChild(child);
}

const writeItemId = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `${JSON.stringify(item)}`;
  DOM.readByIdOutput.appendChild(child);
}

// GET all function
const get = () => {
  DOM.listOutput.innerHTML = ``;

  axios.get(`/read`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        writeItem(response.data);
      } else {
        for (let item of response.data) {
          writeItem(item);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
}

// GET by ID function

const readById = () => {
  DOM.readByIdOutput.innerHTML=``;

  axios.get(`/read/${itemId.value}`)
  .then((response) => {
    if (!Array.isArray(response.data)) {
      writeItemId(response.data);
    } else {
      for (let item of response.data) {
        writeItemId(item);
  }
}
}).catch((err) => {
  console.log(err);
});
}

// POST function
const post = () => {
  axios.post(`/create`, {   name : DOM.inputName.value,
                            description : DOM.inputDescription.value, 
                            price : DOM.inputPrice.value})
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

// PUT function 
const put = () => {
  axios.put(`/update/${idInput.value}`, {
                          name : DOM.updateName.value,
                          description : DOM.updateDescription.value, 
                          price : DOM.updatePrice.value })
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err, (err.response));
    });

  }

  // DELETE function

  const deletePost = () => {
    axios.delete(`/delete/${deleteInput.value}`)
    .then ((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    })
      }
    
// set up the buttons' on click events
DOM.buttonCreate.onclick = () => post();
DOM.buttonUpdate.onclick = () => put();
DOM.buttonDelete.onclick = () => deletePost();
DOM.readByIdButton.onclick = () => readById();

// run the get function on page load
get();