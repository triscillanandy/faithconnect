import bcrypt from 'bcryptjs';

const storedHash = '$2a$10$IDTghj43mduzZFe6iukw1u8S21Ge5S9YodDS14JdIiuxjxVhrrW5G';
const providedPassword = 'Jencar08@';

// Test comparison
bcrypt.compare(providedPassword, storedHash, (err, result) => {
  if (err) {
    console.error('Error during bcrypt comparison:', err);
  } else {
    console.log('Password Match:', result); // Should print true if they match
  }
});
