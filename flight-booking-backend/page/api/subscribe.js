import dbConnect from "../../lib/mongodb";
import Subscriber from "../../models/Subscriber";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { email } = req.body;

      const user = new Subscriber({ email });
      await user.save();

      res.status(200).json({ message: "Subscribed successfully" });

    } catch (error) {
      res.status(500).json({ message: "Error or already subscribed" });
    }
  }
}