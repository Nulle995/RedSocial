export function capitalize(word) {
  const splittedWord = word.split("");
  let newWord = "";

  splittedWord.map((val, idx) => {
    const word = splittedWord[idx];

    if (idx === 0) {
      newWord = word.toUpperCase();
    } else {
      newWord = word.toLowerCase();
    }

    splittedWord.splice(idx, 1, newWord);
  });
  newWord = splittedWord.join("");

  return newWord;
}
