import { useCallback, useEffect, useState } from "react";

const BASE_URL = "http://localhost:5174";

export const useListReservation = () => {
  const [listReservation, setListReservation] = useState<unknown[]>([]);

  const getListReservation = useCallback(async () => {
    const resultReservation = await fetch(`${BASE_URL}/reservation-list`).then(res => res.json());

    if (Array.isArray(resultReservation) && resultReservation.length > 0) {
      setListReservation(resultReservation);
    } else {
      setListReservation([]);
    }
  }, []);

  useEffect(() => {
    getListReservation();
  }, [getListReservation]);

  return {
    listReservation
  }
}