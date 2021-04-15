export interface PaymentResponse {
    id: number,
    amount: number,
    date: string,
    period: string,
    contractNumber: number,
    user: {
        id: number,
        firstName: string,
        lastName: string,
        userPic: string
    } | null
}