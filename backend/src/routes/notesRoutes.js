import express from "express"
import { createAllNotes, deleteAllNotes, getAllNotes, updateAllNotes, getNoteById } from "../controllers/notesController.js";
const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id",getNoteById);
router.post("/",createAllNotes);
router.put("/:id", updateAllNotes);
router.delete("/:id",deleteAllNotes);



export default router;