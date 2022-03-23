import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePushNotificationDTO {
  @IsNotEmpty()
  @IsString()
  schedule: string;

  @IsNotEmpty()
  @IsString()
  queue_id: string;
}
