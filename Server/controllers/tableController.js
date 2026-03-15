import { addTables } from "../models/tableModel.js";

export const addTablesController = async (req, res) => {
  try {

    const { restaurant_id } = req.params;
    const { tables } = req.body;

    const createdTables = await addTables(restaurant_id, tables);

    res.json({
      message: "Tables added successfully",
      tables: createdTables
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Error adding tables" });

  }
};