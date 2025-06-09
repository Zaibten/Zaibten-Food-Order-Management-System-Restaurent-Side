import React, { useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import Loader from "../../Loader/loader";

const TableBooking = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      // 1. Get user email or name from localStorage
      const localData = JSON.parse(localStorage.getItem("data")); // Change this key appropriately
      const userEmail = localData?.email || null;
      const userName = localData?.name || null;

      if (!userEmail && !userName) {
        console.error("Email or Name not found in localStorage");
        return;
      }

      // 2. Query ProfessionalDB based on email or name
      const professionalsRef = collection(db, "ProfessionalDB");
      const q = query(
        professionalsRef,
        where(userEmail ? "email" : "name", "==", userEmail || userName)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("No matching restaurant found for this user.");
        return;
      }

      const professionalDoc = querySnapshot.docs[0];
      const restaurantId = professionalDoc.id;
      const restaurant = professionalDoc.data();
      setRestaurantData(restaurant);

      // 3. Fetch bookings for this restaurant ID
      const bookingsRef = collection(db, "tableBookings");
      const bookingsQuery = query(bookingsRef, where("restaurantId", "==", restaurantId));
      const bookingsSnapshot = await getDocs(bookingsQuery);

      const bookingsData = bookingsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  if (loading) return <Loader />;

  return (
    <div>
      <h3 className="mb-3">Table Reservations</h3>
      {bookings.length > 0 ? (
        <div className="table-responsive shadow-sm">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Booking Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Is Comfirmed</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.bookingTime}</td>
                  <td>{booking.numberOfGuests}</td>
                  <td>{booking.userName}</td>
                  <td>{booking.userEmail}</td>
                  <td
  className={
    booking.Confirm &&
    booking.Confirm.trim().toLowerCase() === "not confirmed yet"
      ? "bg-danger text-white"
      : booking.Confirm &&
        booking.Confirm.trim().toLowerCase() === "confirmed"
      ? "bg-success text-white"
      : "" // no color or add your default class here
  }
>
  {booking.Confirm}
</td>



                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-danger">No bookings found for this restaurant.</p>
      )}
    </div>
  );
};

export default TableBooking;
