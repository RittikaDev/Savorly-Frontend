import { IMeal } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Cartmeal extends IMeal {
	orderQuantity: number;
}

interface InitialState {
	meals: Cartmeal[];
	city: string;
	shippingAddress: string;
	phone: string;
	dietaryPreferences: string;
	scheduledDelivery: string;
	spiceLevel: string;
	extraSauce: string;
	mealProviderId: string;
}

const initialState: InitialState = {
	meals: [],
	city: "",
	shippingAddress: "",
	phone: "",
	mealProviderId: "",
	dietaryPreferences: "",
	scheduledDelivery: "",
	spiceLevel: "",
	extraSauce: "",
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addmeal: (state, action) => {
			// console.log(action.payload);
			if (state.meals.length === 0)
				state.mealProviderId = action.payload.providerId;

			const mealToAdd = state.meals.find(
				(meal) => meal._id === action.payload._id
			);

			if (mealToAdd) {
				mealToAdd.orderQuantity += 1;
				return; // THIS IS MANDOTARY OTHERWISE, BELOW LINE WILL ALSO RUN
			}
			// ...action.payload => IS THE NEWLY ADDED meal, ONLY ONE OBJECT
			state.meals.push({ ...action.payload, orderQuantity: 1 }); // FIRST TIME WHEN SIMILAR meal IS NOT AVAILABLE IN THE CART, IT WILL ADD A NEW PROPERTY NAMED orderQuantity(NOT AVAILABLE BEFORE), AND FROM NEXT TIME IT WILL JUST INCREMENT BY ONE
		},
		incrementOrderQuantity: (state, action) => {
			const mealToIncrement = state.meals.find(
				(meal) => meal._id === action.payload
			);

			if (mealToIncrement) {
				mealToIncrement.orderQuantity += 1;
				return;
			}
		},
		decrementOrderQuantity: (state, action) => {
			const mealToIncrement = state.meals.find(
				(meal) => meal._id === action.payload
			);

			if (mealToIncrement && mealToIncrement.orderQuantity > 1) {
				mealToIncrement.orderQuantity -= 1;
				return;
			}
		},
		removeMeal: (state, action) => {
			state.meals = state.meals.filter((meal) => meal._id !== action.payload);
		},
		updateCity: (state, action) => {
			state.city = action.payload;
		},
		updatePhone: (state, action) => {
			state.phone = action.payload;
		},
		updateShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
		},

		updateSpiceLevel: (state, action) => {
			state.spiceLevel = action.payload;
		},
		updateScheduledDelivery: (state, action) => {
			state.scheduledDelivery = action.payload;
		},
		updateDietaryPreferences: (state, action) => {
			state.dietaryPreferences = action.payload;
		},
		updateExtraSauce: (state, action) => {
			state.extraSauce = action.payload;
		},

		clearCart: (state) => {
			state.meals = [];
			state.city = "";
			state.shippingAddress = "";
			state.dietaryPreferences = "";
			state.spiceLevel = "";
			state.scheduledDelivery = "";
			state.extraSauce = "";
		},
	},
});

//* meals

export const orderedMealsSelector = (state: RootState) => {
	return state.cart.meals;
};

export const orderSelector = (state: RootState, phone: string) => {
	return {
		meals: state.cart.meals.map((meal) => ({
			meal: meal._id, // Ensure it's just the meal ID
			quantity: meal.orderQuantity,
		})),
		address: {
			address: state.cart.shippingAddress,
			city: state.cart.city,
			phone: phone || "",
		},
		dietaryPreferences: state.cart.dietaryPreferences,
		spiceLevel: state.cart.spiceLevel,
		scheduledDelivery: state.cart.scheduledDelivery,
		extraSauce: state.cart.extraSauce,
		providerId: state.cart.mealProviderId,
	};
};

//* Payment

export const subTotalSelector = (state: RootState) => {
	// acc => IMMEDIATE PREVIOUS VALUE
	return state.cart.meals.reduce((acc, meal) => {
		return acc + meal.price * meal.orderQuantity;
	}, 0);
};

export const shippingCostSelector = (state: RootState) => {
	if (
		state.cart.city &&
		state.cart.city === "Dhaka" &&
		state.cart.meals.length > 0
	)
		return 60;
	else if (
		state.cart.city &&
		state.cart.city !== "Dhaka" &&
		state.cart.meals.length > 0
	)
		return 120;
	else return 0;
};

export const grandTotalSelector = (state: RootState) => {
	const subTotal = subTotalSelector(state);
	const shippingCost = shippingCostSelector(state);

	return subTotal + shippingCost;
};

//* Address

export const citySelector = (state: RootState) => {
	return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
	return state.cart.shippingAddress;
};
export const phoneSelector = (state: RootState) => {
	return state.cart.phone;
};

// CUSTOMIZATION
export const dietaryPreferenceSelector = (state: RootState) => {
	return state.cart.dietaryPreferences;
};

export const spiceLevelSelector = (state: RootState) => {
	return state.cart.spiceLevel;
};
export const scheduledDeliverySelector = (state: RootState) => {
	return state.cart.scheduledDelivery;
};
export const extraSauceSelector = (state: RootState) => {
	return state.cart.extraSauce;
};

export const {
	addmeal,
	incrementOrderQuantity,
	decrementOrderQuantity,
	removeMeal,
	updateCity,
	updatePhone,
	updateShippingAddress,
	updateDietaryPreferences,
	updateSpiceLevel,
	updateScheduledDelivery,
	updateExtraSauce,
	clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
