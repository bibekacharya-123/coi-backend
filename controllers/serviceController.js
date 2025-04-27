const Service = require('../models/Service');

exports.createService = async (req, res) => {
  try {
    const { slug, title, subtitle, description, detailedDescription, features, benefits } = req.body;
    const image = req.file ? req.file.path : null;

    const service = new Service({
      slug,
      title,
      subtitle,
      description,
      image,
      detailedDescription: JSON.parse(detailedDescription),
      features: JSON.parse(features),
      benefits: JSON.parse(benefits),
    });

    await service.save();
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, title, subtitle, description, detailedDescription, features, benefits } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        slug,
        title,
        subtitle,
        description,
        ...(image && { image }),
        detailedDescription: JSON.parse(detailedDescription),
        features: JSON.parse(features),
        benefits: JSON.parse(benefits),
      },
      { new: true }
    );

    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};