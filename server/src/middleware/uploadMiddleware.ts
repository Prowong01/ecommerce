import multer from "multer";
import path from "path";

// 定义文件存储的路径和文件名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // 文件保存到服务器的 uploads/ 目录
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.originalname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

// 作用：只允许上传图片类型的文件（如 image/jpeg, image/png）
const fileFilter = (
    req: any,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Not an image! Please upload only images."));
    }
};

// 作用：创建一个配置好的 multer 中间件实例，用于处理文件上传
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 },
});
