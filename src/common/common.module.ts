import { forwardRef, Global, Module } from '@nestjs/common';
import { RedisPushNotificationProcessor } from './redis/push-notification/redis-push-notification.processor';
import { BullModule } from '@nestjs/bull';
import { PushNotificationModule } from 'src/push-notification/push-notification.module';
import { RedisPushNotificationService } from './redis/push-notification/redis-push-notification.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'queue',
    }),
    forwardRef(() => PushNotificationModule),
  ],
  controllers: [],
  providers: [RedisPushNotificationProcessor, RedisPushNotificationService],
  exports: [RedisPushNotificationProcessor, RedisPushNotificationService],
})
export class CommonModule {}
