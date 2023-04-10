const form = document.querySelector('form');
const userList = document.querySelector('#display');

// Function to create a new user and add it to the database
async function createUser(name, email, phone) {
  try {
    const response = await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone })
    });
    if (!response.ok) throw new Error('Failed to create user');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(error);
  }
}

// Function to delete a user from the database
async function deleteUser(id) {
  try {
    const response = await fetch(`/users/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete user');
  } catch (error) {
    console.error(error);
  }
}

// Function to display a list of users on the screen
async function displayUsers() {
  try {
    const response = await fetch('/users');
    if (!response.ok) throw new Error('Failed to get users');
    const users = await response.json();
    userList.innerHTML = '';
    users.forEach(user => {
      const listItem = document.createElement('li');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', async () => {
        await deleteUser(user.id);
        displayUsers();
      });
      listItem.textContent = `Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone}`;
      listItem.appendChild(deleteButton);
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
  }
}

// Event listener for form submission
form.addEventListener('submit', async event => {
  event.preventDefault();
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;
  await createUser(name, email, phone);
  displayUsers();
  form.reset();
});

