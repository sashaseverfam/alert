import { EAlertType } from '../enums/alert.enum';

export interface IAlert {
  id: string;
  type: EAlertType;
  message: string;
  autoClose: boolean;
  autoCloseDuration: number;
  createdAt: Date;
}
