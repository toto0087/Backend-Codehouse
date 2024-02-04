import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder;

        if(File.fieldname === 'profileImage') {
            folder = 'profiles';
        } else if (File.fieldname === 'productImage') {
            folder = 'products';
        } else {
            folder = 'documents';
        }
        cb(null, `uploads/${folder}`);
    },
    filename: (req, file, cb) => {
        const { uid } = req.body;
        cb(null, `${uid}-${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({ storage });