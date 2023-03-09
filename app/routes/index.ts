// Rutas base de API
import * as express from "express"
import v1 from "#/routes/v1"

const router = express.Router();
router.use("/v1", v1);

router.get("", (req, res) => {
    res.status(500).json({
        message: "Hola, bienvenido a la API del curso, de nuevo"
    })
})

export default router;
