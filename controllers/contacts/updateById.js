const { Contact } = require("../../model/contact");
const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(id, req.body);
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
};
module.exports = updateById;
