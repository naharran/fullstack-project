import joi from 'joi'
import { ArtworkForm } from '../../shared/types'

export const artworkSchema = joi.object<ArtworkForm>({
    name: joi.string().required().min(2).max(30),
    description: joi.string().required().max(2000),
    price: joi.number().required(),
    image: joi.string(),
    artistId: joi.string().required(),
    category: joi.string().required()
}); 

export const artworkEditSchema = joi.object<ArtworkForm>({
    name: joi.string().min(2).max(30),
    description: joi.string().max(2000),
    price: joi.number(),
    image: joi.string(),
    artistId: joi.string(),
    category: joi.string()
}); 

