const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs-extra');

const ROOT_PATH = path.resolve(__dirname + '../../../public/media');

router.get('/', async function (req, res, next) {
    const userSuppliedPath = path.resolve(ROOT_PATH + '/' + (req.query.path || ""));
    console.log(userSuppliedPath);
    if (!(userSuppliedPath.startsWith(ROOT_PATH) && await fs.pathExists(userSuppliedPath))) {
        res.send("Error: Path Not Found: ");
        return;
    }
    const files = await fs.readdir(userSuppliedPath, {withFileTypes: true});
    res.render('admin/components/files', {
        path: userSuppliedPath.replace(ROOT_PATH, ""),
        files: files
            .sort(((a, b) => {
                if (a.isDirectory() ^ b.isDirectory()) {
                    return a.isDirectory() ? -1 : 1;
                }

                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            }))
            .filter(file => !file.name.startsWith(".")),
    });
});

module.exports = router;
