import { moods } from "./data.js";
const getMood = (moodScore) => {
  for (let mood of moods) {
    if (mood.moodScore === moodScore) {
      return mood.mood;
    }
  }
  return "";
};

export default getMood;
