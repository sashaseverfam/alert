import { EAlertType } from '../enums/alert.enum';

export interface IAlert {
  id: string;
  type: EAlertType;
  message: string;
  title?: string;
  autoClose: boolean;
  autoCloseDuration: number;
  showClose: boolean;
  createdAt: Date;
  onClick?: (id: string) => void;
}
