const isEmailValid = (email: string): boolean => {
  const regex =
    /^[a-zA-Z0-9!#$%&'+^_`{}~-]+(?:\.[a-zA-Z0-9!#$%&'+^_`{}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

  return regex.test(email);
};

export default isEmailValid;
