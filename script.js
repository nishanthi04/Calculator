let display = document.getElementById('display');
let buttons = document.querySelectorAll('.calc-btn');

let current = '';
let historyList = document.getElementById('history');

// ✅ Handle calculator buttons properly
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    const id = button.id;

    switch (id) {
      case 'clear':
        current = '';
        break;

      case 'del':
        current = current.slice(0, -1);
        break;

      case 'enter':
        try {
          let expression = current.replace(/√/g, 'Math.sqrt');
          let result = eval(expression);
          addToHistory(current, result); // ✅ Save to history
          current = result.toString();
        } catch (err) {
          current = 'ERROR';
        }
        break;

      default:
        current += value;
        break;
    }

    display.value = current;
  });
});

// ✅ Clickable history entries
function addToHistory(expression, result) {
  let li = document.createElement('li');
  li.textContent = `${expression} = ${result}`;

  li.addEventListener('click', () => {
    current = result.toString();
    display.value = current;
  });

  historyList.prepend(li); // Latest on top
}

// ✅ Clear history button
document.getElementById('clear-history').addEventListener('click', () => {
  historyList.innerHTML = '';
});

// ✅ Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (/[\d+\-*/().%]/.test(key)) {
    current += key;
  } else if (key === 'Enter') {
    try {
      let expression = current.replace(/√/g, 'Math.sqrt');
      let result = eval(expression);
      addToHistory(current, result);
      current = result.toString();
    } catch (err) {
      current = 'Error';
    }
  } else if (key === 'Backspace') {
    current = current.slice(0, -1);
  } else if (key.toLowerCase() === 'c') {
    current = ''; // Pressing 'c' clears
  }

  display.value = current;
});

// ✅ Dark mode toggle
document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
