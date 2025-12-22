// 导入文件系统库fs(file system)以及路径库path
const fs = require('fs');
const path = require('path');

// 找到gallery文件夹所在路径GALLERY_DIR
// entries为gallery文件夹下所有文件和文件夹的列表
const GALLERY_DIR = path.join(__dirname, 'gallery');
const entries = fs.readdirSync(GALLERY_DIR, {withFileTypes: true});

// folders为gallery文件夹下所有文件夹的列表
const folders = entries.filter(entry => entry.isDirectory());

const galleries = [];
// 遍历gallery文件夹下每一个文件夹（即每一个相册）
folders.forEach((dir, index) => {
    // 找到相册名称和相册路径
    const folderName = dir.name;
    const folderPath = path.join(GALLERY_DIR, folderName);

    // 如果没有title.txt，则使用相册文件夹名当相册标题；否则用title.txt里面的内容当相册标题
    let title = folderName;
    const titlePath = path.join(folderPath, 'title.txt');
    if (fs.existsSync(titlePath)) {
        title = fs.readFileSync(titlePath, 'utf-8').trim();
    }
    
    // 图片后缀名列表
    const IMAGE_EXTENSIONS = ['.jpg', 'jpeg', 'png', 'webp', 'gif'];

    // files为相册文件夹下所有文件的列表
    const files = fs.readdirSync(folderPath);
    // images为相册文件夹下所有图片的列表
    const images = files.filter(filename => {
        const ext = path.extname(filename).toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext) && filename !== 'cover.jpg';
    });
    // 接下来要创建的images.json的路径
    const imagesJsonPath = path.join(folderPath, 'images.json');
    // 写入images.json
    fs.writeFileSync(imagesJsonPath, 
                JSON.stringify(images, null, 2),
                'utf-8'
    );

    // 每遍历一个相册，都向相册列表里push一次有关这个相册的json内容
    galleries.push({id: index + 1, 
                folder: folderName, 
                title: title, 
                cover: 'cover.jpg'
    });
});

// 接下来要创建的gallery.json的路径
const galleryJsonPath = path.join(GALLERY_DIR, 'gallery.json');
// 写入gallery.json
fs.writeFileSync(
    galleryJsonPath, 
    JSON.stringify(galleries, null, 2),
    'utf-8'
);


