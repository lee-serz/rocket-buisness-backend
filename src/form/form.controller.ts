import { Controller, Post, Body, Logger } from '@nestjs/common';
import { MailService } from '../mail/mail.service';

@Controller('form')
export class FormController {
  private readonly logger = new Logger(FormController.name);

  constructor(private readonly mailService: MailService) {}

  @Post('submit')
  async submitForm(
    @Body() formData: { name: string; phone: string; product?: string },
  ) {
    this.logger.log('Получены данные формы:');
    this.logger.log(formData);

    try {
      await this.mailService.sendFormData(formData);
      this.logger.log('Письмо успешно отправлено');
      return { success: true, message: 'Форма успешно отправлена' };
    } catch (error) {
      this.logger.error('Ошибка при отправке письма:', error.stack);
      return { success: false, message: 'Ошибка при отправке формы' };
    }
  }
}
