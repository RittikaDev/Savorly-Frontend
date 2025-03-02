"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import {
  changePassword,
  currentUserDetails,
  logout,
  updateProfile,
} from "@/services/AuthService";
import {
  createMealProvider,
  getMealProvider,
  updateMealProvider,
} from "@/services/MealProvider";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ManageProfile() {
  const [profileData, setProfileData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });
  const [mealProviderData, setMealProviderData] = useState<{
    restaurantName: string;
    cuisineSpecialties: string[];
    pricing: number;
    experience: string;
    availability: boolean;
    ratings: number;
  }>({
    restaurantName: "",
    cuisineSpecialties: [],
    pricing: 0,
    experience: "",
    availability: true,
    ratings: 0,
  });

  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const options = [
    "Mexican",
    "Italian",
    "Indian",
    "Chinese",
    "Japanese",
    "Thai",
  ];

  useEffect(() => {
    if (mealProviderData && mealProviderData.cuisineSpecialties)
      setSelectedSpecialties(mealProviderData.cuisineSpecialties);
  }, [mealProviderData]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    if (e.target.checked)
      setSelectedSpecialties([...selectedSpecialties, value]);
    else
      setSelectedSpecialties(
        selectedSpecialties.filter((item) => item !== value)
      );
  };

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isExisting, setIsExisting] = useState(false);

  const { user } = useUser();

  // Auto-fill profile data with current user if available
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.email) {
        try {
          const currentUser = await currentUserDetails({ email: user.email });
          if (currentUser?.data) {
            setProfileData({
              name: currentUser.data.name || "",
              address: currentUser.data.address || "",
              city: currentUser.data.city || "",
              phone: currentUser.data.phone || "",
            });
          }
          if (user?.role == "provider") {
            const mealProvider = await getMealProvider(user.userId);
            console.log(mealProvider);
            if (mealProvider.data.length == 0) setIsExisting(false);
            else {
              setIsExisting(true);
              setMealProviderData({
                restaurantName: mealProvider.data.restaurantName || "",
                cuisineSpecialties: mealProvider.data.cuisineSpecialties || "",
                pricing: mealProvider.data.pricing || "",
                experience: mealProvider.data.experience || "",
                availability: mealProvider.data.availability || "",
                ratings: mealProvider.data.ratings || "",
              });
            }
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [user?.email, user?.role, user?.userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value);
    // const { id, value } = e.target;
    setProfileData((prev) => ({ ...prev, [id]: value }));
  };
  const handleInputMealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "cuisineSpecialties") {
      // Convert the string to an array by splitting by comma
      setMealProviderData((prevData) => ({
        ...prevData,
        cuisineSpecialties: value.split(",").map((item) => item.trim()), // Trim spaces
      }));
    } else {
      setMealProviderData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [id]: value }));
  };

  const [isUpdating, setIsUpdating] = useState(false); // Flag to track updates

  const updateProviderProfile = async () => {
    // const orderLoading = toast.loading("Updating Profile...");

    try {
      setIsUpdating(true); // Indicate update is in progress

      setMealProviderData((prevData) => ({
        ...prevData,
        cuisineSpecialties: selectedSpecialties,
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
      // toast.error("Failed to update profile. Please try again.", {
      //   id: orderLoading,
      // });
    }
  };

  // ✅ Trigger API call after `mealProviderData` updates
  useEffect(() => {
    if (isUpdating) {
      (async () => {
        const orderLoading = toast.loading("Updating Profile...");

        try {
          const result = isExisting
            ? await updateMealProvider(user?.userId, mealProviderData)
            : await createMealProvider(user?.userId, mealProviderData);

          console.log("API response:", result);
          toast.success(result.message, { id: orderLoading });
        } catch (error) {
          console.error("Error updating profile:", error);
          toast.error("Failed to update profile. Please try again.", {
            id: orderLoading,
          });
        } finally {
          setIsUpdating(false); // Reset update flag
        }
      })();
    }
  }, [mealProviderData, isUpdating]);
  const updateProfileInfo = async () => {
    const orderLoading = toast.loading("Updating Profile...");

    try {
      const result = await updateProfile(profileData);
      //   console.log(result);
      toast.success(result.message, { id: orderLoading });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update password. Please try again.", {
        id: orderLoading,
      });
    }
  };

  const updatePassword = async () => {
    // const toastId = ShowToast("Updating Password...", "#ffdf20", "loading");
    const orderLoading = toast.loading("Updating Password...");

    try {
      const result = await changePassword(passwordData);
      toast.success(result.message, { id: orderLoading });

      logout();

      window.location.href = "/login";
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password. Please try again.", {
        id: orderLoading,
      });
    }
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRating = parseInt(e.target.value, 10); // Convert to number
    setMealProviderData((prevData) => ({
      ...prevData,
      ratings: selectedRating,
    }));
  };
  const handleAvailableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMealProviderData((prevData) => ({
      ...prevData,
      availability: e.target.value === "Yes",
    }));
  };

  const handleProfileUpdate = () => {
    // Validation logic can be added here
    updateProfileInfo();
  };

  const handlePasswordUpdate = () => {
    updatePassword();
  };

  const handleMealProviderUpdate = () => {
    updateProviderProfile();
  };

  // Check if all profile fields are filled
  const isProfileComplete = Object.values(profileData).every(
    (field) => field !== ""
  );

  // Check if all password fields are filled
  const isPasswordComplete =
    passwordData.oldPassword !== "" && passwordData.newPassword !== "";

  // Check if all meal provider fields are filled
  const isMealProviderComplete = Object.values(mealProviderData).every(
    (field) => field !== ""
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1>Manage Profile</h1>
      <Tabs defaultValue="account" className="w-full  p-6">
        <TabsList
          className={`grid w-full mb-6 ${
            user?.role === "provider" ? "grid-cols-3" : "grid-cols-2"
          }`}
        >
          <TabsTrigger value="account">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          {user?.role === "provider" && (
            <TabsTrigger value="mealprovider">Meal Provider Info</TabsTrigger>
          )}
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <div className="text-center space-y-1.5 px-2 md:px-0">
                <h2>Profile</h2>
                <p>
                  Update your personal information and contact details here.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  placeholder="Your Address"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="city"
                  value={profileData.city}
                  onChange={handleInputChange}
                  placeholder="Your City"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                onClick={handleProfileUpdate}
                disabled={!isProfileComplete}
              >
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <div className="text-center space-y-1.5 px-2 md:px-0">
                <h2>Password</h2>
                <p>
                  Change your password. After saving, you wll be logged out.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="oldPassword">Old Password</Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter old password"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                onClick={handlePasswordUpdate}
                disabled={!isPasswordComplete}
              >
                Save Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="mealprovider">
          <Card>
            <CardHeader>
              <div className="text-center space-y-1.5 px-2 md:px-0">
                <h2>Meal Provider Profile</h2>
                <p>
                  {isExisting ? "Update" : "Create"} your meal provider profile
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Restaurant Name */}
              <div className="space-y-1">
                <Label htmlFor="restaurantName">Restaurant Name</Label>
                <Input
                  id="restaurantName"
                  value={mealProviderData.restaurantName}
                  onChange={handleInputMealChange}
                  placeholder="Your restaurant name"
                />
              </div>

              {/* Cuisine Specialties */}
              <div className="space-y-4">
                <label htmlFor="cuisineSpecialties">Cuisine Specialties</label>
                <div className="flex flex-wrap space-x-4 items-center">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={option}
                        value={option}
                        checked={selectedSpecialties.includes(option)}
                        onChange={handleChange}
                        className="h-4 w-4"
                        disabled={selectedSpecialties.includes(option)} // Disable already selected options
                      />
                      <label htmlFor={option} className="ml-2 text-sm">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <label htmlFor="selectedCuisines" className="block">
                    Selected Cuisines
                  </label>
                  <div className="flex flex-wrap space-x-2 mt-2">
                    {selectedSpecialties.map((option, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 text-sm px-3 py-1 rounded-full"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-1">
                <Label htmlFor="pricing">Average Meal Pricing</Label>
                <Input
                  id="pricing"
                  type="number"
                  value={mealProviderData.pricing}
                  onChange={handleInputMealChange}
                  placeholder="Enter average price per meal"
                />
              </div>

              {/* Experience */}
              <div className="space-y-1">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  value={mealProviderData.experience}
                  onChange={handleInputMealChange}
                  placeholder="Years of experience in cooking"
                />
              </div>

              {/* Availability */}
              <div className="space-y-1">
                <Label htmlFor="availability">
                  Currently Accepting Orders?
                </Label>
                <select
                  id="availability"
                  onChange={handleAvailableChange}
                  value={mealProviderData.availability ? "Yes" : "No"}
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Ratings (Read-Only) */}
              <div className="space-y-1">
                <Label>Ratings</Label>
                <select
                  value={mealProviderData.ratings}
                  onChange={handleRatingChange} // Update the selected rating
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                <p className="mt-2">
                  Current Rating: {mealProviderData.ratings}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                onClick={handleMealProviderUpdate}
                disabled={!isMealProviderComplete}
              >
                {isExisting
                  ? "Update Meal Provider Profile"
                  : "Create Meal Provider Profile"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ManageProfile;
