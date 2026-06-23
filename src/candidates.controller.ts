import { Body, Controller, Get, Post } from '@nestjs/common';
import { CandidatesService } from './candidates.service';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get()
  findAll() {
    return this.candidatesService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.candidatesService.create(body);
  }
}
