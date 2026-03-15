import express from "express";
import { addTablesController } from "../controllers/tableController.js";

const router = express.Router();

router.post("/:restaurant_id/tables", addTablesController);

export default router;