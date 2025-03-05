export interface IOrderMeal {
	meals: IMeal[];
	address?: {
		address: string;
		city: string;
		phone: string;
	};
	scheduledDelivery: string;
	providerId: string;
	dietaryPreferences?: string;
	spiceLevel?: string;
	extraSauce?: string;
}

export interface IMeal {
	meal: string;
	quantity: number;
}
