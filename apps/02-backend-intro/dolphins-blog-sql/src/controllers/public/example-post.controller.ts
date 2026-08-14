import type { Request, Response } from 'express';

const examplePostController = ( _req: Request, res: Response ) => {
  res.render('public/post-example.njk', {
    pageClass: 'page-example-post',
  });
};

export default examplePostController;
