import { Body, Controller, Get, Post } from '@nestjs/common';

import { PushNotificationService } from './push-notification.service';

import { CreatePushNotificationDTO } from './dto/create-push-notification.dto';

@Controller('api/v1/notifications')
export class PushNotificationController {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  @Post('push-notifications')
  async createPushNotification(
    @Body() data: CreatePushNotificationDTO,
  ): Promise<any> {
    try {
      console.log(
        data,
        '=> push-notification.controller.createPushNotification > data',
      );

      const result = await this.pushNotificationService.createPushNotification(
        data,
      );

      return {
        success: true,
        message: {
          code: 'INSERT_DATA_SUCCESS',
          message: 'Tambah data sukses.',
        },
        result,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post('queue-workshops')
  async createQueueWorkshop(@Body() data: any): Promise<any> {
    try {
      console.log(
        data,
        '=> push-notification.controller.createPushNotification > data',
      );

      const result = await this.pushNotificationService.createQueueWorkshop(
        data,
      );

      return {
        success: true,
        message: {
          code: 'INSERT_DATA_SUCCESS',
          message: 'Tambah data sukses.',
        },
        result,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('push-notifications')
  async getPushNotifications(): Promise<any> {
    try {
      const result = await this.pushNotificationService.getPushNotifications();

      return {
        success: true,
        message: {
          code: 'LIST_DATA_SUCCESS',
          message: 'List data sukses.',
        },
        result,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
