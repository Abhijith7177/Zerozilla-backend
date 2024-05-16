const Agency = require('../Schema/AgencySchema');
const Client = require('../Schema/ClientSchema');
const { createAgencyAndClientValidation } = require('../Utility/validation');

exports.createAgencyAndClient = async (req, res) => {
  try {
    const { error } = createAgencyAndClientValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, address1, address2, state, city, phoneNumber, clientName, clientEmail, clientPhoneNumber, clientTotalBill } = req.body;

    const newAgency = new Agency({ name, address1, address2, state, city, phoneNumber });
    const savedAgency = await newAgency.save();

    const newClient = new Client({
      agencyId: savedAgency._id,
      name: clientName,
      email: clientEmail,
      phoneNumber: clientPhoneNumber,
      totalBill: clientTotalBill
    });
    await newClient.save();

    res.status(201).json({ message: 'Agency and client created successfully', data: newClient });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.topClients = async (req, res) => {
  try {
    const topClients = await Client.find()
      .populate('agencyId', 'name')
      .sort({ totalBill: -1 })
      .lean();

    const clientsWithAgencyName = topClients.map(client => ({
      AgencyName: client.agencyId.name,
      ClientName: client.name,
      TotalBill: client.totalBill
    }));

    res.status(200).json({ message: 'Top Clients of agencies fetched', data: clientsWithAgencyName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};