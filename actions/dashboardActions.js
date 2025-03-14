"use server";
import getMood from "@/lib/getMood";
import { prisma } from "@/lib/prisma.js";
import { auth } from "@clerk/nextjs/server";

const getCollectionsForDashboard = async (skip, per_page) => {
  let allCollections = [];
  const collections = await prisma.collection.findMany({
    skip: skip,
    take: per_page,
    select: {
      id: true,
      name: true,
      entries: {
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
      },
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  let allDistinctCollections = await prisma.collection.findMany();
  const entriesWithoutCollection = await prisma.entry.findMany({
    where: {
      collectionId: null,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (entriesWithoutCollection.length === 0) {
    allCollections = [...collections];
  } else if (entriesWithoutCollection.length > 0) {
    const unorganized = {
      id: null,
      name: "Unorganized",
      entries: entriesWithoutCollection,
      createdAt:
        entriesWithoutCollection[entriesWithoutCollection.length - 1].createdAt,
    };
    allCollections = [unorganized, ...collections];
  }

  let result = allCollections.map(({ name, entries, createdAt, id }) => {
    return {
      id: id,
      name: name,
      entries: entries,
      createdAt: createdAt,
      entriesCount: entries.length,
    };
  });
  return { result, collectionsCount: allDistinctCollections.length };
};

const getAnalytics = async (period = "30") => {
  let startDate = new Date();
  const { userId } = await auth();

  if (period === "7") {
    startDate.setDate(startDate.getDate() - 7);
  } else if (period === "15") {
    startDate.setDate(startDate.getDate() - 15);
  } else if (period === "30") {
    startDate.setDate(startDate.getDate() - 30);
  }

  const entries = await prisma.entry.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: startDate,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const moodData = entries.reduce((acc, entry) => {
    let date = entry.createdAt.toISOString().split("T")[0];

    if (!acc[date]) {
      acc[date] = {
        totalScore: 0,
        count: 0,
        entries: [],
      };
    }
    acc[date].totalScore += entry.moodScore;
    acc[date].count += 1;
    acc[date].entries.push(entry);

    return acc;
  }, {});

  const analyticsData = Object.entries(moodData).map(([date, data]) => {
    return {
      date: date,
      averageScore: Number((data.totalScore / data.count).toFixed(1)),
      entriesCount: data.count,
    };
  });

  let overallStats = {
    averageScore: 0,
    entriesPerDay: 0,
    mostFreqMoods: [],
    moodSummary: "",
  };

  let map = new Map();
  for (let entry of entries) {
    map.set(entry.moodScore, (map.get(entry.moodScore) || 0) + 1);
  }

  let moodScoreArrWithCount = [];
  for (let [moodScore, count] of map) {
    moodScoreArrWithCount.push({
      moodScore,
      count,
    });
  }

  let sortedMoodScoreArrWithCount = moodScoreArrWithCount.sort(
    (a, b) => b.count - a.count
  );

  let mostFreqCount = sortedMoodScoreArrWithCount?.[0]?.count;
  let mostFreqMoods = sortedMoodScoreArrWithCount.filter(
    ({ count }) => count === mostFreqCount
  );

  overallStats.mostFreqMoods = mostFreqMoods;

  overallStats.averageScore =
    entries.length === 0
      ? 0
      : Number(
          (
            entries.reduce((acc, entry) => acc + entry.moodScore, 0) /
            entries.length
          ).toFixed(1)
        );

  overallStats.entriesPerDay = Number(
    (entries.length / (period === "7" ? 7 : period === "15" ? 15 : 30)).toFixed(
      2
    )
  );

  let { averageScore } = overallStats;
  if (averageScore === 0)
    overallStats.moodSummary = "You haven't logged any entries yet!";
  else if (averageScore <= 3) {
    overallStats.moodSummary = "You're doing okay! Keep it up!👍🏽";
  } else if (averageScore <= 6 && averageScore > 3) {
    overallStats.moodSummary = "You're doing pretty good! Keep it up!🙂";
  } else if (averageScore <= 10 && averageScore > 6) {
    overallStats.moodSummary = "🤟🏽You're doing great! Keep it up!👌🏽";
  }
  return {
    status: true,
    data: {
      timeline: analyticsData,
      stats: overallStats,
      entries: entries,
    },
  };
};
export { getCollectionsForDashboard, getAnalytics };
