import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class RedisQueueWorkshopService {
  constructor(@InjectQueue('queue') private workshopQueue: Queue) {}

  async createQueueWorkshop(data: any) {
    try {
      const queueId = `queue-workshop_queue-${data.id}`;

      console.log(data);
      await this.workshopQueue.add('autoQueueWorkshop', data, {
        delay: data.delay,
        jobId: queueId,
        backoff: {
          type: 'exponential',
          delay: 10000,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
