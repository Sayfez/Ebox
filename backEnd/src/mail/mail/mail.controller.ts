import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Post('send')
  async sendEmail(
    @Body() body: { to: string; subject: string; text: string },
  ): Promise<void> {
    const { to, subject, text } = body;
    await this.mailService.sendMail(to, subject, text);
  }
}
