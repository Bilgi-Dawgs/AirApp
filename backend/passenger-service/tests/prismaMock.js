import { vi, beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

const mockPrisma = mockDeep();

vi.mock("../src/db/prismaClient.js", () => ({
  __esModule: true,
  default: mockPrisma,
}));

export const prismaMock = mockPrisma;

beforeEach(() => {
  mockReset(mockPrisma);
});
