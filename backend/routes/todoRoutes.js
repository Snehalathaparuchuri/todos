
const express = require('express');
const { getTodos, createTodo, deleteTodo, updateTodo } = require('../controllers/todoController');

const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo); // New PUT route
router.delete('/:id', deleteTodo);

module.exports = router;
