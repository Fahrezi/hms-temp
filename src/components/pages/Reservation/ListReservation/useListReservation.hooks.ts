import { useState } from "react";

import { useDataDemo } from "@/hooks/useDataDemo";

// const BASE_URL = "http://localhost:5175";

export const useListReservation = () => {
  const { reservations } = useDataDemo();
  const [listReservation, setListReservation] = useState<unknown[]>(reservations);

  // const getListReservation = useCallback(async () => {
  //   const resultReservation = await fetch(`${BASE_URL}/reservation-list`).then(res => res.json());

  //   if (Array.isArray(resultReservation) && resultReservation.length > 0) {
  //     setListReservation(resultReservation);
  //   } else {
  //     setListReservation([]);
  //   }
  // }, []);

  // useEffect(() => {
  //   getListReservation();
  // }, [getListReservation]);

  return {
    listReservation,
    setListReservation
  }
}