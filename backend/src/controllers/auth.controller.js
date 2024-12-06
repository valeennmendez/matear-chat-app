import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    //Hasheo de contraseña
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son requeridos." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "la contraseña tiene que ser mayor a 6 caracteres" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "el correo ya existe." });

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: passwordHashed,
    });

    if (newUser) {
      //Generar el JWT.
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Datos del usuario invalidos." });
    }
  } catch (error) {
    console.log("Error al registrar al usuario", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son requeridos." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email no encontrado." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Credenciales invalidas" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log("Error en el controlador de login.", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Deslogueado exitosamente." });
  } catch (error) {
    console.log("Error al desloguearse", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "La foto es requerida." });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error al actualizar la foto:", error);
    res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error en controlador checkAuth: ", error);
    res.status(500).json({ message: "Error en el servido" });
  }
};
