import { Response } from "express";


export class ResponseErrors {


    static badRequest(message: string, res: Response) {
        return res.status(400).json({error: message})
    }

}