import * as express from 'express';
import * as cors from 'cors';
import middleware from './middlewares';
import routes from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app
      .use(cors())
      .use(express.json())
      .use(accessControl)
      .use('/login', routes.login)
      .use('/teams', routes.team)
      .use('/matches', routes.matches)
      .use('/leaderboard', routes.leaderboard)
      .use(middleware.error);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa  exportação
export const { app } = new App();
