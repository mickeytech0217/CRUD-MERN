const express = require("express");
const router = express.Router();
const passport = require("passport");

const Todo = require("../../Model/Todo");
const { validateTodoInput } = require("../../Validation/todo");

// @route   GET api/todos
// @desc    get user todos list
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      //create sample todo

      // await Todo.create({
      //   user: req.user._id,
      //   title: "Grocery",
      //   description: "buy groceries before 2nd monday of this month",
      // });

      const Todos = await Todo.find({ user: req.user._id }).lean();
      res.json({
        message: `found ${Todos.length} record(s)`,
        data: Todos,
        error: null,
      });
      res;
    } catch (error) {
      res
        .status(400)
        .json({ message: "something went wrong", data: null, error });
    }
  }
);

// @route   POST api/todos
// @desc    create a new todo for the user
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validateTodoInput(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { title, description } = req.body;

      // Create a new todo
      const newTodo = await Todo.create({
        user: req.user._id,
        title,
        description,
      });

      res.json({
        message: "Todo created successfully",
        data: newTodo,
        error: null,
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "something went wrong", data: null, error });
    }
  }
);

module.exports = router;
