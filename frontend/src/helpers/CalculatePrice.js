
export default function CalculatePrice(typeOfNews, dayOfNews) {
  if (dayOfNews < 7) {
    let pricePerDay = [2000, 20000, 30000][typeOfNews - 1];
    return pricePerDay * dayOfNews;
  } else if (dayOfNews >= 7 && dayOfNews < 30) {
    let pricePerDay = [12600, 126000, 189000][typeOfNews - 1];
    return pricePerDay * (dayOfNews / 7) + pricePerDay * (dayOfNews % 7);
  } else if (dayOfNews >= 30) {
    let pricePerDay = [48000, 480000, 720000][typeOfNews - 1];
    return pricePerDay * (dayOfNews / 30) + pricePerDay * (dayOfNews % 30);
  } else {
    return 0;
  }
}
