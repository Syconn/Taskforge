import { Board } from "./data";

export { };

declare global {
  interface Window {
    api: {
      createId: () => string;
    },
    boards: {
      create: (data: Board) => void;
      update: (id: string, data: Partial<Board>) => void;
      delete: (id: string) => void;
      getAll: () => Board[];
    };
  }
}
