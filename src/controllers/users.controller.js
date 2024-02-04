import { toggleUserRole, updateUserDocuments, getUserDocuments } from '../services/user.service.js';


const requiredDocuments = [
  "Identificacion.pdf",
  "Comprobante.pdf",
  "Estado de cuenta.pdf"
];


async function userPremium(req, res) {
  try {
    const { id } = req.params;

    // Verificar si el usuario ya ha cargado los documentos requeridos
    const userDocuments = await getUserDocuments(id);

    const allDocumentsUploaded = requiredDocuments.every(doc => userDocuments.includes(doc));

    if (!allDocumentsUploaded) {
      return res.status(400).json({ error: 'Debe cargar todos los documentos requeridos antes de ser premium.' });
    }

    const updatedUser = await toggleUserRole(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error al cambiar el rol del usuario:', error);
    res.status(500).json({ error: 'Error al cambiar el rol del usuario' });
  }
}

async function uploadDocuments(req, res) {
  try {
    const { uid } = req.params;
    
    // Guardar los nombres de los documentos en la base de datos o en algún lugar según tus necesidades
    const documentNames = req.files.map(file => file.filename);
    await updateUserDocuments(uid, documentNames);

    res.status(200).json({ message: 'Documentos cargados exitosamente.' });
  } catch (error) {
    console.error('Error al cargar documentos:', error);
    res.status(500).json({ error: 'Error al cargar documentos.' });
  }
}

export { userPremium, uploadDocuments };