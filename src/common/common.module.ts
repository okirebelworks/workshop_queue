import { forwardRef, Global, Module } from '@nestjs/common';
import { RedisPushNotificationProcessor } from './redis/push-notification/redis-push-notification.processor';
import { BullModule } from '@nestjs/bull';
import { PushNotificationModule } from 'src/push-notification/push-notification.module';
import { RedisPushNotificationService } from './redis/push-notification/redis-push-notification.service';
import { RedisQueueWorkshopService } from './redis/queue-workshop/redis-queue-workshop.service';
import { RedisQueueWorkshopProcessor } from './redis/queue-workshop/redis-queue-workshop.processor';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'queue',
    }),
    forwardRef(() => PushNotificationModule),
  ],
  controllers: [],
  providers: [
    RedisPushNotificationProcessor,
    RedisPushNotificationService,
    RedisQueueWorkshopProcessor,
    RedisQueueWorkshopService,
  ],
  exports: [
    RedisPushNotificationProcessor,
    RedisPushNotificationService,
    RedisQueueWorkshopProcessor,
    RedisQueueWorkshopService,
  ],
})
export class CommonModule {}
