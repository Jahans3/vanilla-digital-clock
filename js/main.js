const digitConfig = [
  ['top', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'bottom'],
  ['top-right', 'bottom-right'],
  ['top', 'top-right', 'middle', 'bottom-left', 'bottom'],
  ['top', 'top-right', 'middle', 'bottom-right', 'bottom'],
  ['top-left', 'top-right', 'middle', 'bottom-right'],
  ['top', 'top-left', 'middle', 'bottom-right', 'bottom'],
  ['top', 'top-left', 'middle', 'bottom-left', 'bottom-right', 'bottom'],
  ['top', 'top-right', 'bottom-right'],
  ['top', 'top-left', 'top-right', 'middle', 'bottom-right', 'bottom-left', 'bottom'],
  ['top', 'top-left', 'top-right', 'middle', 'bottom-right', 'bottom']
];

function clock() {
  const [firstDigit, secondDigit, thirdDigit, fourthDigit] = document.getElementsByClassName('number');

  function setActive(child, config) {
    const activeLine = config.find(className => child.classList.contains(className));

    if (activeLine) {
      child.classList.add('active');
    } else {
      child.classList.remove('active');
    }
  }

  function setDigit(digit, value) {
    if (value > 9 || value < 0) return;

    const children = digit.children;
    const config = digitConfig[value];

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      if (child.classList.contains('spacer')) {
        continue;
      }

      if (child.classList.contains('row')) {
        const rowChildren = child.children;

        for (let j = 0; j < rowChildren.length; j++) {
          setActive(rowChildren[j], config);
        }

        continue;
      }

      setActive(child, config);
    }
  }

  function setClock(first, second, third, fourth) {
    setDigit(firstDigit, first);
    setDigit(secondDigit, second);
    setDigit(thirdDigit, third);
    setDigit(fourthDigit, fourth);
  }

  function setDividerTick() {
    const circles = document.getElementsByClassName('circle');

    [...circles].forEach(circle => {
      if (circle.classList.contains('active')) {
        circle.classList.remove('active');
      } else {
        circle.classList.add('active');
      }
    });
  }

  function splitTwoDigits(number) {
    const [firstValue, secondValue] = String(number).split('');
    return [firstValue, secondValue];
  }

  function runClock() {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      let first, second, third, fourth;

      if (hours < 10) {
        first = 0;
        second = hours;
      } else {
        const [firstValue, secondValue] = splitTwoDigits(hours);

        first = Number(firstValue);
        second = Number(secondValue);
      }

      if (minutes < 10) {
        third = 0;
        fourth = minutes;
      } else {
        const [firstValue, secondValue] = splitTwoDigits(minutes);

        third = firstValue;
        fourth = secondValue;
      }

      setClock(first, second, third, fourth);
      setDividerTick();
    }, 1000);

    return () => clearInterval(intervalId);
  }

  const stopClock = runClock();

  return stopClock;
}

clock();
