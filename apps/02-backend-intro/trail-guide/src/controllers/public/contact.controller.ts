import type { Request, Response } from 'express';

const contactController = (_req: Request, res: Response) => {
  res.render('public/contact.njk', { title: 'Trail Guide - Contact Page' });
};
export default contactController;
