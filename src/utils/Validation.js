const Valid = (e) => {
  let input = document.querySelector(`#${[e.target.id]}`);
  if (
    e.target.id === "username" ||
    e.target.id === "name" ||
    e.target.id === "lastname"
  ) {
    if (e.target.value.length > 0) {
      input.classList.remove("notValid");
      input.classList.add("valid");
      return true;
    } else {
      input.classList.remove("valid");
      input.classList.add("notValid");
      return false;
    }
  }
  if (e.target.id === "email") {
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      )
    ) {
      input.classList.remove("notValid");
      input.classList.add("valid");
      return true;
    } else {
      input.classList.remove("valid");
      input.classList.add("notValid");
      return false;
    }
  }
  if (e.target.id === "password") {
    if (
      /^(?=.*[a-z]{2,})(?=.*[A-Z]{2,})(?=.*\d{2,})(?=.*[!@#$%^&*()\-+=\\|;:'",./<>?\][{}`~]{2,})(?=.{8,})/.test(
        e.target.value
      )
    ) {
      input.classList.remove("notValid");
      input.classList.remove("medium");
      input.classList.add("strong");
      return 3;
    } else if (
      /^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+)(?=.{8,})/.test(e.target.value)
    ) {
      input.classList.remove("notValid");
      input.classList.remove("strong");
      input.classList.add("medium");
      return 2;
    } else {
      input.classList.remove("medium");
      input.classList.remove("strong");
      input.classList.add("notValid");
      return 1;
    }
  }
};

export const validEmail = (value) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  );

export const validPassword = (value) =>
  /^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+)(?=.{8,})/.test(value);

export default Valid;
