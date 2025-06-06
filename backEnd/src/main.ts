import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as fs from 'fs';

/*async function bootstrap() {
  const httpsOptions = {
  key: fs.readFileSync('./secrets/private-key.pem'),
  cert: fs.readFileSync('./secrets/public-certificate.pem'),
};
const app = await NestFactory.create(AppModule, {
  httpsOptions,
});
await app.listen(3000);const app = await NestFactory.create(AppModule);
app.enableCors{{origin:true,}};
await app.listen(3003);
}*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  

  
  const port = 3003;
  const host = '0.0.0.0'; // my IP '192.168.1.101'

  await app.listen(port, host);
  //await app.listen(3003);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
