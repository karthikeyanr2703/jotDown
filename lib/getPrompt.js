import { moods } from "./data";
const getPromptFromMoodScore = (moodScore) => {
  const prompt = moods.find(
    (moodObj) => moodObj.moodScore === moodScore
  ).prompt;
  return prompt;
};

export default getPromptFromMoodScore;
