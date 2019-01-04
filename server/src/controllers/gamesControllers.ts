import { Request, Response } from 'express';

import pool from '../database';

class GamesController {

   public async list (req:Request, res:Response) {
    
     const games = await pool.query("SELECT * from games");
     res.json(games);
   }
   

   public async getOne (req:Request, res:Response):Promise<any> {
    const { id } = req.params;

    const game = await pool.query("SELECT * FROM games where id = ?", [id]);
    
    if(game.length > 0){
      return res.json(game);
    }

    res.status(404).json({text:"El juego no existe"});

    res.json(game);
   }


   public async create (req:Request, res:Response):Promise<void> {
     console.log(req.body);
     await pool.query('INSERT INTO games set ?', [req.body]);
      res.json({message:"Juego guardado"});
   }
       
   public async delete (req:Request, res:Response) {
    await pool.query('DELETE FROM games where id = ?', req.params.id);
     res.json({message:"Game delete",id: req.params.id});
   }
    
   public async update (req:Request, res:Response) {
    await pool.query('UPDATE games set ? WHERE id = ?', [req.body, req.params.id]);
    res.json({message:"The game was updated"});
   }
}


const gamesController = new GamesController();

export default gamesController;