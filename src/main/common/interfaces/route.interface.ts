import { Router, RequestHandler } from 'express';

export interface IRoute {
  path: string;
  method: 'get' | 'post' | 'patch' | 'delete' | 'put';
  handler: RequestHandler;
}

export interface IController {
  router: Router;
  addRoute(route: IRoute): void;
}