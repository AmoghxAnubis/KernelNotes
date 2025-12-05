import express from "express";
import {
  getEntries,
  createEntry,
  deleteEntry,
} from "../controllers/entriesController";

const router = express.Router();

router.get("/", getEntries);
router.post("/", createEntry);
router.delete("/:id", deleteEntry);

export default router;
