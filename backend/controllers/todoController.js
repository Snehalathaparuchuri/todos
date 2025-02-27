const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTodo = async (req, res) => {
    try {
        const { task } = req.body;
        const newTodo = new Todo({ task });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Todo deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateTodo = async (req, res) => {
    try {
        const { task, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { task, completed },
            { new: true, runValidators: true } // Returns updated document & validates
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
