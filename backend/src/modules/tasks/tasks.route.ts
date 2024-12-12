import { Router } from 'express';
import { PgDataSource } from '../../../db/datasource';
import { Task } from '../../entities/task.entity';
import { TaskService } from './tasks.service';
import { TaskController } from '../../controllers/tasks/tasks.controller';
import { DataSource, Repository } from 'typeorm';

export default class TaskRouter {
  public router: Router;
  private taskService: TaskService;
  private taskController: TaskController;
  private taskRepository: Repository<Task>;
  constructor() {
    this.router = Router();
    this.taskRepository = PgDataSource.getRepository(Task);
    this.taskService = new TaskService(this.taskRepository);
    this.taskController = new TaskController(this.taskService);
  }

  public init() {
    this.router
      .route('/')
      .get(this.taskController.getAll.bind(this.taskController));
    this.router
      .route('/:id')
      .get(this.taskController.getOne.bind(this.taskController));
    this.router
      .route('/')
      .post(this.taskController.create.bind(this.taskController));
    this.router
      .route('/:id')
      .put(this.taskController.update.bind(this.taskController));
    this.router
      .route('/:id')
      .delete(this.taskController.delete.bind(this.taskController));
    return this.router;
  }
}
