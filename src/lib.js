export function formatSentence(sentence) {
  return sentence.replace(/[^a-zA-Z]/g, "");
}

export function addUp(scoreArr) {
  return scoreArr.reduce((acc, curr) => {
    if (curr) {
      return acc + parseInt(curr);
    }
    return acc;
  }, 0)
}