const express = require("express");
const router = express.Router();
const Joi = require("joi");
const contactsOperations = require("../../model/index.js");

const joiSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),

  email: Joi.string()

    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await contactsOperations.getContactById(id);

    if (!contact) {
      const error = new Error("not found");
      error.status = 404;
      throw error;
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteContact = await contactsOperations.removeContact(id);
    if (!deleteContact) {
      const error = new Error("not found");
      error.status = 404;
      throw error;
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const updateContact = await contactsOperations.updateContact(id, req.body);
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
