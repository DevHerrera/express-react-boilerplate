import { Repository } from 'typeorm';
import { Task } from 'src/entities/task.entity';

export class TaskService {
  constructor(private taskRepository: Repository<Task>) {}

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({ id });
  }

  create(task: Task) {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  async update(id: number, updateData: Partial<Task>) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new Error('Task not found');
    this.taskRepository.merge(task, updateData);
    return this.taskRepository.save(task);
  }

  delete(id: number) {
    return this.taskRepository.delete(id);
  }
}
