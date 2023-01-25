/***
 * @param {Event} e
 * @param {string} inputState
 * @param {function} setInputState

 *
 */
export const addEmoji = (e, inputState, setInputState) => {
  let sym = e.unified.split('-');
  let codesArray = [];
  sym.forEach((el) => codesArray.push('0x' + el));
  let emoji = String.fromCodePoint(...codesArray);
  setInputState(inputState + emoji);
  //   setShowEmojisState;
};
