import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, "./public/temp")
    },
    filename: function (req, file, cd) {
        const uniqueSuffix = Date.now() + '-' + "PaperBrock"
        cd(null, file.filename + "-" + uniqueSuffix);
    }
})

export const upload = multer({
    storage
})