import type { Request, Response } from 'express';

const contactController = (_req: Request, res: Response) => {
  res.render('public/contact.njk');
};
export default contactController;
