export interface ApiContact {
    id: string;
    name: string;
    phone: number;
    email: string;
    photoUrl: string;
}

export interface ApiContactMutation {
    id: string;
    name: string;
    phone: string;
    email: string;
    photoUrl: string;
}

export interface CartContact {
    contact: ApiContactMutation;
    amount: number;
}