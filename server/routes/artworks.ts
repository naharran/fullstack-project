import {Router, Request, Response} from 'express';
import validator, { SchemasEnum } from '../middleware/validator';
import { getAllArtworks, saveArtwork, getArtworkById, deleteArtworkById, editArtwork } from '../services/artworksService';

const router = Router();


router.post('/', validator(SchemasEnum.artwork), async(req,res) => {
    console.log('passed validation succesfuly', req.body);

    try{
       const newArtWork = await saveArtwork(req.body);
       console.log(newArtWork);
       res.status(200).json(newArtWork)
    }
    catch(error){
        console.log(error)
        res.status(401).end('Error creating artwork')
    }
})
router.get('/', async(req,res) => {
    try{
        const { name } = req.query;
        const artworks = await getAllArtworks({ name: name as string } );
        console.log(artworks);
        res.status(200).json(artworks)
    }
    catch(error){
        console.log(error)
        res.status(401).end('Error getting artworks')
    }
})

router.get('/:id', async(req,res) => {
    const id = req.params.id;
    try{
       const { Item } = await getArtworkById(id);
       console.log(Item);
       res.status(200).json(Item)
    }
    catch(error){
        console.log(error)
        res.status(401).end('Error getting artwork')
    }
})

router.delete('/:id', async(req,res) => {
    const id = req.params.id;
    
    try{
       const result = await deleteArtworkById(id);
       console.log(result);
       res.status(200).json('Deleted succesfully')
    }
    catch(error){
        console.log(error)
        res.status(401).end('Error getting artwork')
    }
})

router.put('/:id', async(req,res) => {
    const id = req.params.id;
    const artworkEdits = req.body;
    try{
       const result = await editArtwork(id, artworkEdits);
       console.log(result);
       res.status(200).json('Deleted succesfully')
    }
    catch(error){
        console.log(error)
        res.status(401).end('Error getting artwork')
    }
})


export default router;
