export interface IOrder {
	products: IOrderProduct[];
	coupon?: string;
	shippingAddress: string;
	paymentMethod: string;
}

export interface IOrderProduct {
	product: string;
	quantity: number;
	color: string;
}

export interface ICoupon {
	shopId: string;
	subTotal: number;
	couponCode: string;
}

export interface IOrderMeal {
	meals: IMeal[];
	address?: {
		address: string;
		city: string;
		phone: string;
	};
	scheduledDelivery: Date;
	providerId: string;
	dietaryPreferences?: string;
	spiceLevel?: string;
	extraSauce?: string;
}

export interface IMeal {
	meal: string;
	quantity: number;
}
