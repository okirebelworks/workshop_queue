import { Injectable, Logger } from '@nestjs/common';
import { RedisPushNotificationService } from 'src/common/redis/push-notification/redis-push-notification.service';
import { DateTimeUtils } from 'src/utils/date-time-utils';
import { CreatePushNotificationDTO } from './dto/create-push-notification.dto';

@Injectable()
export class PushNotificationService {
  constructor(
    private readonly redisPushNotificationService: RedisPushNotificationService,
  ) {}

  private readonly logger = new Logger(PushNotificationService.name);

  async getPushNotifications(): Promise<any> {
    try {
      await this.redisPushNotificationService.listQueue();
      return { status: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createPushNotification(data: CreatePushNotificationDTO): Promise<any> {
    try {
      console.log(
        data,
        '=> push-notification.service.createPushNotification > data',
      );

      //=> Validasi Date
      const gmt_offset = '7';
      const schedule = new Date(`${data.schedule} +${gmt_offset}`);
      const queueId = data.queue_id;

      await this.createPushNotificationQueue(schedule, queueId);

      return { status: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updatePushNotificationStatusFinished(data: {
    push_notification_id: string;
  }) {
    try {
      console.log(
        data,
        '=> push-notification.service.updatePushNotificationStatusFinished > data',
      );

      await this.broadcastPushNotification();

      return { status: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updatePushNotificationStatusCancelled(data: {
    push_notification_id: string;
  }) {
    try {
      console.log(
        data,
        '=> push-notification.service.updatePushNotificationStatusCancelled > data',
      );

      await this.deletePushNotificationQueue(data.push_notification_id);

      return { status: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createPushNotificationQueue(schedule: any, queueId: string) {
    try {
      const payloadStart: any = {
        push_notification_id: queueId,
        delay: DateTimeUtils.nowToDatetimeMilis(schedule),
      };
      await this.redisPushNotificationService.createAutoPushNotificationQueue(
        payloadStart,
      );

      return { status: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async broadcastPushNotification() {
    console.log('QUEUE TEREKSEKUSI');
  }

  async deletePushNotificationQueue(findPushNotificationId: string) {
    await this.redisPushNotificationService.deleteAutoPushNotificationQueue({
      push_notification_id: findPushNotificationId,
    });
  }
}
