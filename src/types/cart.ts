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
