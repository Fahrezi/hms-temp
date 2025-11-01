import { useCallback, useEffect, useState } from "react"

type List = {
  label: string,
  value: string
};

type ListResponse = {
  name: string,
  id: string
};

const BASE_URL = "http://localhost:5174";

export const useDetail = () => {
  const [countryList, setCountryList] = useState<List[]>([]);
  const [citiesList, setCitiesList] = useState<List[]>([]);
  const [nationalityList, setNationalityList] = useState<List[]>([]);
  const [languageList, setLanguageList] = useState<List[]>([]);

  const getData = useCallback(async () => {
    const countryResult = await fetch(`${BASE_URL}/countries  `).then(res => res.json());
    const citiesResult = await fetch(`${BASE_URL}/cities`).then(res => res.json());
    const nationalityResult = await fetch(`${BASE_URL}/nationality`).then(res => res.json());
    const languageResult = await fetch(`${BASE_URL}/language`).then(res => res.json());

    setCountryList(countryResult.map((country: ListResponse) => ({ label: country.name, value: country.id })));
    setCitiesList(citiesResult.map((city: ListResponse) => ({ label: city.name, value: city.id })));
    setNationalityList(nationalityResult.map((nation: ListResponse) => ({ label: nation.name, value: nation.id })));
    setLanguageList(languageResult.map((lang: ListResponse) => ({ label: lang.name, value: lang.id })));
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);


  return {
    countryList,
    citiesList,
    nationalityList,
    languageList
  }
}