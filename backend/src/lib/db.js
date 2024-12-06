import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("MONGODB_UR", process.env.MONGODB_URI);

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error al conectarse a MongoDB", error);
  }
};
