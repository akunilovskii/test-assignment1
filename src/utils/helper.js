import { studentsOffline } from "./config";

export async function AJAX(url) {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    if (!res.ok) {
      throw new Error();
    }
  } catch (error) {
    const message = "Failed to get the data from server";
    alert(message);
  }
}
// return studentsOffline;

export function calcGradesAverage(arr) {
  const gradesSum = arr.reduce((s, el) => {
    return (s += +el);
  }, 0);
  return gradesSum / arr.length;
}
