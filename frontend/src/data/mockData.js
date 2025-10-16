// frontend/src/data/mockData.js

export const initialData = {
  ws1: {
    id: "ws1", // Add this ID
    name: "DBMS",
    initial: "D",
    channels: [
      { id: "c1", name: "general" },
      { id: "c2", name: "case-study" },
      { id: "c3", name: "project" },
    ],
    messages: {
      c1: [
        {
          id: "m1",
          text: "Welcome to the main workspace!",
          userId: "Admin",
          createdAt: new Date(),
        },
        {
          id: "m2",
          text: "Please be respectful.",
          userId: "Admin",
          createdAt: new Date(),
        },
      ],
      c2: [
        {
          id: "m3",
          text: "Frontend review tomorrow.",
          userId: "Leader",
          createdAt: new Date(),
        },
      ],
      c3: [], // Ensure this channel has an empty messages array
    },
  },
  ws2: {
    id: "ws2", // Add this ID
    name: "OS",
    initial: "O",
    channels: [
      { id: "c3", name: "process-scheduling" },
      { id: "c4", name: "disk-scheduling" },
    ],
    messages: {
      c3: [
        {
          id: "m4",
          text: "Here you can post your process scheduling algorithms.",
          userId: "Developer",
          createdAt: new Date(),
        },
      ],
      c4: [],
    },
  },
};
