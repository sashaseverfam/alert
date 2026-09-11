import { EAlertType } from '../enums/alert.enum';

export interface AlertAction {
  label: string;
  onClick: (id: string) => void;
}

export interface AlertColorOverrides {
  backgroundColor?: string;
  iconColor?: string;
  buttonColor?: string;
  progressColor?: string;
}

export interface IAlert {
  id: string;
  type: EAlertType;
  message: string;
  htmlMessage?: string;
  title?: string;
  autoClose: boolean;
  autoCloseDuration: number;
  showClose: boolean;
  createdAt: Date;
  onClick?: (id: string) => void;
  actions?: AlertAction[];
  colors?: AlertColorOverrides;
}
