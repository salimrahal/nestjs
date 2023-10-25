import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile:'schema.gql'
  }),
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'kong',
  password: 'kongpass@',
  database: 'invoiceapp',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
}),
CustomerModule,
InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
