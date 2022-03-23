import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class RedisPushNotificationService {
  constructor(
    @InjectQueue('queue') private readonly pushNotificationQueue: Queue,
  ) {}

  private readonly logger = new Logger(RedisPushNotificationService.name);

  async listQueue() {
    try {
      const queue = await this.pushNotificationQueue.getDelayed();
      console.log(queue);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createAutoPushNotificationQueue(data: any) {
    try {
      const queueId = `queue-push_notifications-${data.push_notification_id}`;
      this.logger.debug('AUTO PUSH NOTIFICATION QUEUE CREATED. ID: ' + queueId);
      console.log(data);
      await this.pushNotificationQueue.add('autoPushNotification', data, {
        delay: data.delay,
        jobId: queueId,
        backoff: {
          type: 'exponential',
          delay: 60000,
        },
      });
      console.log('returning 3');
      return { status: true };
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAutoPushNotificationQueue(data: any) {
    try {
      const queueId = `notifications-push_notifications-${data.push_notification_id}`;
      this.logger.debug('AUTO PUSH NOTIFICATION QUEUE DELETED. ID: ' + queueId);
      return await this.pushNotificationQueue.removeJobs(queueId);
    } catch (error) {
      console.error(error);
    }
  }
}
