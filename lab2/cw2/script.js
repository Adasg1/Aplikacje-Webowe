function generatePassword() {
    const minLength = parseInt(document.getElementById("minLength").value);
    const maxLength = parseInt(document.getElementById("maxLength").value);
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeSpecialChars = document.getElementById("specialChars").checked;
  
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_-+=<>?/{}~|";
  
    let characters = lowercase + numbers;
    if (includeUppercase) characters += uppercase;
    if (includeSpecialChars) characters += specialChars;
  
    if (minLength > maxLength) {
      alert("Minimalna długość nie może być większa niż maksymalna.");
      return;
    }
  
    const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let password = "";
  
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    alert("Wygenerowane hasło: " + password);
  }