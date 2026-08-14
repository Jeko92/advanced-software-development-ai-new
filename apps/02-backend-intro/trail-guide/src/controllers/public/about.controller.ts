import type { Request, Response } from 'express';

const aboutController = (_req: Request, res: Response) => {
  res.render('public/about.njk');
};

export default aboutController;
