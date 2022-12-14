const notesAccepted = [2000, 500, 200, 100, 50, 20, 10, 5, 1];
const form = document.querySelector(".user-input");
const bill = document.querySelector(".bill-amount");
const cash = document.querySelector(".cash-amount");
const errorMsg = document.querySelector(".errorMsg");
const noteList = document.querySelector(".note-list");
const result = document.querySelector(".result-display");
const toggle = document.querySelector(".toggle-mode");
const root = document.querySelector(":root");

let darkMode = true;
toggle.addEventListener("click", () => {
  darkMode = !darkMode;
  if (darkMode) {
    toggle.textContent = "☀️";
    root.style.setProperty("--color-primary", "#1c82f7");
    root.style.setProperty("--color-secondary", " #000001");
  } else {
    toggle.textContent = "⛅";
    root.style.setProperty("--color-primary", " #000001");
    root.style.setProperty("--color-secondary", "#ffbc42");
  }
});

result.style.display = "none";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  result.style.display = "";
  if (Number(cash.value) < Number(bill.value)) {
    noteList.style.display = "none";
    errorMsg.textContent = "Received Cash value is less then exact bill amount. Collect more ";
  } else if (Number(cash.value) === Number(bill.value)) {
    noteList.style.display = "none";
    errorMsg.textContent = "Yayyy! You paid the exact bill amount!";
  } else {
    noteList.style.display = "";
    errorMsg.textContent =
      "Amount To Collect: " +
      (Number(cash.value) - Number(bill.value)) +
      "Rupees";
    const notes = cashRegister(
      notesAccepted,
      Number(bill.value),
      Number(cash.value)
    );
    noteList.innerHTML = Object.keys(notes)
      .map((note) => {
        return (
          "<li>" +
          "<span>" +
          note +
          "</span>" +
          "-" +
          "<span>" +
          notes[note] +
          "</span>" +
          "</li>"
        );
      })
      .join("");
  }
  bill.value = "";
  cash.value = "";
});

function cashRegister(notesAccepted, billAmount, cashPaid) {
  const cashToReturn = cashPaid - billAmount;
  const notes = {};
  let bill = cashToReturn;
  for (let i = 0; i < notesAccepted.length; i++) {
    if (bill % notesAccepted[i] === billAmount) {
      notes[notesAccepted[i]] = 0;
    } else {
      notes[notesAccepted[i]] = Math.floor(bill / notesAccepted[i]);
      bill = bill % notesAccepted[i];
    }
  }
  return notes;
}