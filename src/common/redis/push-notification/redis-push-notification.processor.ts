import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PushNotificationService } from 'src/push-notification/push-notification.service';

@Processor('queue')
export class RedisPushNotificationProcessor {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}
  private readonly logger = new Logger(RedisPushNotificationProcessor.name);

  @Process('autoPushNotification')
  async handleAutoPushNotification(job: Job) {
    try {
      this.logger.debug(
        'AUTO PUSH NOTIFICATION QUEUE EXECUTED. ID: ' +
          job.data.push_notification_id,
      );
      await this.pushNotificationService.updatePushNotificationStatusFinished({
        push_notification_id: job.data.push_notification_id,
      });
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
