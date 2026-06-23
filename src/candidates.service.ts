import { Injectable } from '@nestjs/common';

export interface Candidate {
  id: number;
  name: string;
  email: string;
  experienceYears: number;
}

@Injectable()
export class CandidatesService {
  private candidates: Candidate[] = [];
  private nextId = 1;

  findAll(): Candidate[] {
    return this.candidates;
  }

  create(data: { name: string; email: string; experienceYears: number }): Candidate {
    const candidate: Candidate = {
      id: this.nextId++,
      name: data.name,
      email: data.email,
      experienceYears: data.experienceYears,
    };
    this.candidates.push(candidate);
    return candidate;
  }
}
