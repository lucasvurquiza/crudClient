export const isEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
  // var exclude = /[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/;
  // var check = /@[w-]+./;
  // var checkend = /.[a-zA-Z]{2,3}$/;
  // if (
  //   email.search(exclude) !== -1 ||
  //   email.search(check) === -1 ||
  //   email.search(checkend) === -1
  // ) {
  //   return false;
  // } else {
  //   return true;
  // }
};
