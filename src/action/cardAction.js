export function addCardData(cardData) {
  return {
    type: "ADD_CARD_DATA",
    payload: cardData,
  };
}
export function filterCardData(cardData) {
  return {
    type: "FILTER_CARD_DATA",
    payload: cardData,
  };
}
