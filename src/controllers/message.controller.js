import { create } from "../services/message.service.js";

function createMessage(req, res) {    
    try {
      const createdMessage = create(req.body);
      return res.status(200).json({ message: "message created", message: createdMessage });
    } catch (error) {
      return res.status(500).json({ error: "Error al crear el mensaje" });
    }
}

export default createMessage;