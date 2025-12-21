const fs = require('fs');
const path = require('path');

const GALLERY_DIR = path.join(__dirname, 'gallery');
const entries = fs.readdirSync(GALLERY_DIR, {withFileTypes: true});

const folders = entries.filter(entry => entry.isDirectory());

const galleries = [];
folders.forEach((dir, index) => {
    const folderName = dir.name;
    const folderPath = path.join(GALLERY_DIR, folderName);

    let title = folderName;
    
    const titlePath = path.join(folderPath, 'title.txt');
    if (fs.existsSync(titlePath)) {
        title = fs.readFileSync(titlePath, 'utf-8').trim();
    }
    const IMAGE_EXTENSIONS = ['.jpg', 'jpeg', 'png', 'webp', 'gif'];
    const files = fs.readdirSync(folderPath);
    const images = files.filter(filename => {
        const ext = path.extname(filename).toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext) && filename !== 'cover.jpg';
    });
    const imagesJsonPath = path.join(folderPath, 'images.json');
    fs.writeFileSync(imagesJsonPath, 
                JSON.stringify(images, null, 2),
                'utf-8'
    );
    galleries.push({id: index + 1, 
                folder: folderName, 
                title: title, 
                cover: 'cover.jpg'
    });
});

const galleryJsonPath = path.join(GALLERY_DIR, 'gallery.json');
fs.writeFileSync(
    galleryJsonPath, 
    JSON.stringify(galleries, null, 2),
    'utf-8'
);


