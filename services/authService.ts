// services/authService.ts
import { User } from "@/types/auth";

// Mock "database"
const mockUsers: User[] = [
  { id: 1, username: "john", email: "john@example.com", password: "123456" },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (email: string, password: string) => {
    await delay(1000);
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    return user;
  },

  signup: async (username: string, email: string, password: string) => {
    await delay(1000);
    const existing = mockUsers.find((u) => u.email === email);
    if (existing) throw new Error("Email already exists");
    const newUser = { id: mockUsers.length + 1, username, email, password };
    mockUsers.push(newUser);
    return newUser;
  },
};
