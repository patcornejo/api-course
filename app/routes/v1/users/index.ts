import { Router } from "express";
import store from 'store2';
import {v4} from 'uuid';
import {RequestItem, UserItem} from "#/interfaces/IModels";


const router = Router();

router.post('/', async (req, res) => {
    try {
        const auth = req.header('Authorization')
        const body: RequestItem = req.body as RequestItem;

        if (body.age !== undefined && body.name !== undefined && body.email !== undefined) {
            const str = JSON.stringify(body)
            store.set(v4(), str);
            return res.status(201).json({success: true, message: 'Operación Realizada'});
        }

        res.status(403).json({
            success: false, message: "No autorizado."
        });

    } catch (e) {
        res.status(404).json({
            success: false, message: "Error al crear el usuario"
        });
    }
});

router.get('/', async (req, res) => {
    const a = store.getAll();
    const b: any = [];
    Object.keys(a).forEach((key) => {
        const user: UserItem = JSON.parse(store.get(key)) as UserItem;
        user.id = key;
        b.push(user)
    })
    res.status(200).json(b);
});

router.get('/:id', async (req, res) => {

    try {
        const id = req.params.id;

        if (id !== undefined) {
            const strUser = store.get(id);

            if (strUser !== undefined) {
                const user: UserItem = JSON.parse(strUser);
                user.id = id;
                return res.json(user);
            }

            res.status(404).json({success: false, message: "Datos inválidos"});
        }
    } catch (e) {
        res.status(404).json({success: false, message: "Error General"});
    }
});

router.delete('/:id', (req, res) => {
    // TODO Delete User
});

router.put('/:id', (req, res) => {
    try {
        const id = req.params.id;
        const body: UserItem = req.body as UserItem;

        if (id !== undefined && (body.age && body.email && body.name)) {
            const strUser = store.get(id);

            if (strUser !== undefined) {
                store.set(id, JSON.stringify(body));
                res.json({success: true, message: "Operación realizada"})
            }

            res.status(404).json({success: false, message: "Datos inválidos"});
        }
    } catch (e) {
        res.status(404).json({success: false, message: "Error General"});
    }
})

export default router;
