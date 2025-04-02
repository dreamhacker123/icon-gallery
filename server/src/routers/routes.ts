import { Router } from "express";
import { uploadImage } from "../handlers/uploadImage";
import { getImages } from "../handlers/getImages";
import { getFolders } from "../handlers/getFolders";
import { createFolder } from "../handlers/createFolder";
import { moveImages } from "../handlers/moveImages";
import { toggleVisibility } from "../handlers/toggleVisibility";
import { deleteFolders } from "../handlers/deleteFolders";
import { deleteImages } from "../handlers/deleteImages";
import { reorderFolders } from "../handlers/reorderFolders";
import { reorderImages } from "../handlers/reorderImages";


const router = Router();



router.get("/folders", getFolders);
router.post("/folders", createFolder as any);


router.post("/images", uploadImage);
router.get("/images", getImages);

router.put('/images/move', moveImages as any);

router.put('/images/toggle-visibility', toggleVisibility as any);

router.delete('/folders/:id', deleteFolders as any);
router.delete('/images', deleteImages as any);

router.put('/folders/reorder', reorderFolders as any);
router.put('/images/reorder', reorderImages as any);

export default router;
