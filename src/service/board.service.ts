import Ajv from "ajv";
import { BoardRepo } from "../db/board.repo";
import { boardSchema } from "../db/schema";
import { Board } from "../util/data";

const ajv = new Ajv();
const validate = ajv.compile(boardSchema);

export class BoardService {
    private repo: BoardRepo;

    constructor(repo?: BoardRepo) {
        this.repo = repo ?? new BoardRepo();
    }

    create(board: Board) {
        if (!validate(board)) throw new Error("Invalid board");
        return this.repo.create(board);
    }

    update(id: string, board: Board) {
        if (!validate(board)) throw new Error("Invalid board");
        return this.repo.update(id, board);
    }

    delete(id: string) {
        return this.repo.delete(id);
    }

    getAll() {
        return this.repo.findAll();
    }
}