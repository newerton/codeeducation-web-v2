import api from "./api";

type FindZipcodeResponse = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location: {
    type: string;
    coordinates: {
      longitude: string;
      latitude: string;
    };
  };
  state_id: string;
  city_id: string;
};

const getStateId = async (state: string) => {
  return api.get(`/state/letter/${state}`);
};

const getCityId = async (state_id: string, city: string) => {
  return api.get(`/city/${state_id}/${city}`);
};

const findZipcode = async (zipcode: string): Promise<FindZipcodeResponse> => {
  return api
    .get(`https://brasilapi.com.br/api/cep/v2/${zipcode}`)
    .then(async ({ status, data }: any) => {
      if (status === 200) {
        const { status: stateStatus, data: stateData } = await getStateId(
          data.state
        );
        if (stateStatus === 200) {
          const { status: cityStatus, data: cityData } = await getCityId(
            stateData.id,
            data.city
          );
          if (cityStatus === 200) {
            return {
              ...data,
              state_id: stateData.id,
              city_id: cityData.id,
            };
          }
          return {
            ...data,
            state_id: stateData.id,
          };
        }
      }
    })
    .catch(() => {
      throw new Error("CEP não encontrado");
    });
};

export default findZipcode;
