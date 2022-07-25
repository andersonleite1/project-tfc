export const requestUserValid = {
  email: "admin@admin.com", 
  password: "secret_admin" 
};

export const requestEmptyEmail = {
  email: "", 
  password: "secret_admin" 
};

export const requestIncorrectEmail = {
  email: "user@email.com", 
  password: "secret_admin" 
};

export const requestEmptyPassword = {
  email: "admin@admin.com", 
  password: "" 
};

export const requestSmallPassword = {
  email: "admin@admin.com", 
  password: "abcde" 
};

export const requestIncorrectPassword = {
  email: "admin@admin.com", 
  password: "batata_frita" 
};
