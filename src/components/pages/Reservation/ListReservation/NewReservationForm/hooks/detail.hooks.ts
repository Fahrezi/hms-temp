import { useCallback, useEffect, useState } from "react"

type List = {
  label: string,
  value: string
};

type ListResponse = {
  name: string,
  id: string
};

export const useDetail = () => {
  const [countryList, setCountryList] = useState<List[]>([]);
  const [citiesList, setCitiesList] = useState<List[]>([]);
  const [nationalityList, setNationalityList] = useState<List[]>([]);
  const [languageList, setLanguageList] = useState<List[]>([]);

  const getData = useCallback(async () => {
    const countryResult = [
      {
        "id": "1",
        "name": "Indonesia"
      },
      {
        "id": "2",
        "name": "USA"
      },
      {
        "id": "3",
        "name": "Singapore"
      }
    ];
    const citiesResult = [
      {
        "id": "1",
        "name": "Jakarta"
      },
      {
        "id": "2",
        "name": "Bandung"
      },
      {
        "id": "3",
        "name": "Yogyakarta"
      },
    ];
    const nationalityResult = [
      {
        "id": "1",
        "name": "Indonesia"
      },
      {
        "id": "2",
        "name": "USA"
      },
      {
        "id": "3",
        "name": "Singapore"
      }
    ];
    const languageResult = [
    {
      "id": "1",
      "name": "Indonesian"
    },
    {
      "id": "2",
      "name": "English"
    },
    {
      "id": "3",
      "name": "Chinese"
    }
  ];

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