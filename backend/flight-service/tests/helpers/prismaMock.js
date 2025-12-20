import { vi, beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import prisma from "../../src/db/prismaClient.js";

vi.mock("../../src/db/prismaClient", () => ({
  __esModule: true,
  default: mockDeep(),
}));

export const prismaMock = prisma;

beforeEach(() => {
  mockReset(prismaMock);
});
