import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendFormData(formData: {
    name: string;
    phone: string;
    product?: string;
  }): Promise<void> {
    await this.mailerService.sendMail({
      to: this.configService.get('SMTP_RECIPIENT'),
      subject: 'Новая заявка',
      template: './message',
      context: {
        name: formData.name,
        phone: formData.phone,
        product: formData.product,
        date: new Date().toLocaleString(),
      },
    });

    this.logger.log('Письмо успешно отправлено');
  }
}
