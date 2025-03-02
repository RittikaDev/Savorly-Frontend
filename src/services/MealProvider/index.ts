"use server";

export const getMealProvider = async (userID: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal-provider/${userID}`
    );
    const result = await res.json();
    // console.log(result);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const createMealProvider = async (userID: any, providerData: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal-provider/${userID}/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(providerData),
      }
    );
    const result = await res.json();
    // console.log(result);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const updateMealProvider = async (userID: any, providerData: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal-provider/${userID}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(providerData),
      }
    );
    const result = await res.json();
    // console.log(result);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
