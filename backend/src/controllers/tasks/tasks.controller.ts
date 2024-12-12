import { Request, Response } from 'express';
import { TaskService } from 'src/modules/tasks/tasks.service';

export class TaskController {
  constructor(private taskService: TaskService) {}

  async getAll(req: Request, res: Response) {
    const tasks = await this.taskService.findAll();
    return res.json(tasks);
  }

  async getOne(req: Request, res: Response) {
    const task = await this.taskService.findOne(+req.params.id);
    return res.json(task);
  }

  async create(req: Request, res: Response) {
    const task = await this.taskService.create(req.body);
    return res.json(task);
  }

  async update(req: Request, res: Response) {
    const task = await this.taskService.update(+req.params.id, req.body);
    return res.json(task);
  }

  async delete(req: Request, res: Response) {
    const result = await this.taskService.delete(+req.params.id);
    return res.json(result);
  }
}
