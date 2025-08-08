import Password from "../models/pass.models.js";

export const savePassword = async (req, res) => {
  try {
    const { website, username, password } = req.body;
    if (!website || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.user._id;
    const newPassword = new Password({ website, username, password, user: userId });

    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (error) {
    console.error("Error saving password:", error.message);
    res.status(500).json({ message: "Failed to save password" });
  }
};


export const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user._id });
    res.status(200).json(passwords);
  } catch (error) {
    console.error("Get passwords error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Password.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deleted) {
      return res.status(404).json({ message: "Password not found" });
    }

    res.status(200).json({ message: "Password deleted" });
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
