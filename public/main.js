

const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

/*Sending a Put Request
The easiest way to trigger a PUT request in modern browsers is to use the Fetch API. 

Fetch has the following syntax:

fetch(endpoint, options)

We need to send a PUT request this time. We can do this by setting Fetch’s method to put.

Modern applications send JSON data to servers. They also receive JSON data back to servers. JSON stands for JavaScript 
Object Notation. They’re like JavaScript objects, but each property and value are written between two quotation marks.

We need to tell the server we’re sending JSON data by setting the Content-Type headers to application/json.

Next, we need to convert the data we send into JSON. We can do this with JSON.stringify. This data is passed via the body property.


*/


update.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Darth Vadar',
        quote: 'I find your lack of faith disturbing.'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(true)
      })
  })
  
  deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Darth Vadar'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No quote to delete') {
          messageDiv.textContent = 'No Darth Vadar quote to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
  })