import { Label } from './Label';
import { Person } from './Person';

export interface Card {
  title: string;
  description: string;
  labels: Label[];
  members: Person[];
}
