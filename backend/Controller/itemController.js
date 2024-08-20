import Item from "../Model/item.model.js";

// Controller to get all items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching items.' });
  }
};

// Controller to get a single item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the item.' });
  }
};

// Controller to create a new item
export const createItem = async (req, res) => {
  const { name, description, quantity, price, category } = req.body;

  try {
    const newItem = await Item.create({ name, description, quantity, price, category });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while creating the item.', details: error.message });
  }
};

// Controller to update an item
export const updateItem = async (req, res) => {
  const { name, description, quantity, price, category } = req.body;

  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found.' });
    }

    await item.update({ name, description, quantity, price, category });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while updating the item.', details: error.message });
  }
};

// Controller to delete an item
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found.' });
    }

    await item.destroy();
   return res.status(204).json({message:"Deleted successfully"}).send(); // 204 No Content, item successfully deleted
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the item.' });
  }
};
