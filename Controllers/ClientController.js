const Client = require("../Schema/ClientSchema");
const { updateClientValidation } = require("../Utility/validation");


exports.updateClient = async (req, res) => {
  try {
    const { clientId } = req.query;
    const { error } = updateClientValidation(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      clientId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedClient) throw new Error('Client not found');

    res.json({ message: 'Client details updated successfully', client: updatedClient });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
