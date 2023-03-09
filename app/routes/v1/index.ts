// Rutas base de API
import * as express from "express"
import users from "#/routes/v1/users"
import {promises as fs} from 'fs';
import * as process from "process";

const router = express.Router();
router.use("/users", users);


router.get('/html', async (req, res) => {
    const h = await fs.readFile(`${process.cwd()}/templates/unit_name.html`, { encoding: 'utf8'});
    res.set('Content-Type', 'text/html');
    res.send(h);
})

export default router;
