export interface IModalState {
  showModal: boolean;
  message: string;
}

export const initialModalState: IModalState = {
  showModal: false,
  message: '',
};
