export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CardType {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  isChecked: boolean;
}

export interface CardListType {
  data: CardType[];
}

export interface ActionModalType {
  visible: boolean;
  type: string;
  handleCancel: () => void;
  handleOk: () => void;
  deleteItem?: {
    id: string;
    title: string;
    date: string;
  };
}
