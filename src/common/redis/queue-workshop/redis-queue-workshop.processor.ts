import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PushNotificationService } from 'src/push-notification/push-notification.service';

@Processor('queue')
export class RedisQueueWorkshopProcessor {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  private readonly logger = new Logger(RedisQueueWorkshopProcessor.name);

  @Process('autoQueueWorkshop')
  async handleAutoQueueWorkshop(job: Job) {
    try {
      this.logger.debug(
        'AUTO PUSH NOTIFICATION QUEUE EXECUTED. ID: ' + job.data.id,
      );
      throw new Error('ERROR BUATAN');

      await this.pushNotificationService.executeQueue({
        id: job.data.id,
      });
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
