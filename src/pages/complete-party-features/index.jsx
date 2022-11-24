import { useState, useCallback } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { View, Image } from 'react-native';
import { DRINK_TYPES, FOOD_TYPES, PARTY_TYPES, MUSIC_STYLES } from '../../constants/';
import { api } from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { setFeaturesIsCompleted } from '../../reducers/application.js';
import Toast from 'react-native-toast-message';
import Stepper from 'react-native-stepper-ui';
import { SelectFeature } from '../../components/select-feature';
import { SelectTypes } from '../../components/select-types';

export function CompletePartyFeaturesScreen() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userSession.currentUser);

  const [activeStepper, setActiveStepper] = useState(0);

  const [smokePlace, setSmokePlace] = useState(false);
  const [availableTables, setAvailableTables] = useState(false);

  const [foodTypeList, setFoodTypeList] = useState([]);
  const [drinkTypeList, setDrinkTypeList] = useState([]);
  const [partyTypeList, setPartyTypeList] = useState([]);
  const [musicStyleList, setMusicStyleList] = useState([]);

  const completePartyFeatures = useCallback(async () => {
    const partyFeatures = {
      smokePlace,
      availableTables,
      foodTypeList: [...foodTypeList],
      drinkTypeList: [...drinkTypeList],
      partyTypeList: [...partyTypeList],
      musicStyleList: [...musicStyleList],
    };

    try {
      const response = await api.patch(`/party-features/${currentUser?.party_place?.id}`, {
        body: JSON.stringify({ partyFeatures: { ...partyFeatures } }),
      });

      if (!response.ok) throw response;

      Toast.show({
        type: 'success',
        text1: 'Obrigado por concluir o seu cadastro',
      });

      dispatch(setFeaturesIsCompleted(currentUser));
    } catch (error) {
      const errorMessage = error.body.errors[0];

      Toast.show({
        type: 'error',
        text1: errorMessage,
      });
    }
  }, [
    drinkTypeList,
    foodTypeList,
    musicStyleList,
    partyTypeList,
    smokePlace,
    availableTables,
    currentUser,
    dispatch,
  ]);

  const RenderInitialSelection = () => (
    <View>
      <View style={{ paddingVertical: 20 }}>
        <Text category="h4">Olá {currentUser?.party_place?.main_contact}!</Text>
        <Text category="p1">Conte para nós como é o seu estabelecimento.</Text>
      </View>

      <SelectFeature
        title="Permitido fumar"
        content="Estabelecimento com local para fumantes"
        checkboxText="Espaço para fumantes (àreas abertas, fumódromo, etc)"
        isSelected={smokePlace}
        setIsSelected={setSmokePlace}
      >
        <Image style={{ width: 80, height: 80 }} source={require('../../assets/cigarette.png')} />
      </SelectFeature>

      <SelectFeature
        title="Local para sentar"
        content="Cadeiras e mesas disponíveis para os clientes"
        checkboxText="Mesas e cadeiras para a consumação (bancas, àreas de descanso, etc)"
        isSelected={availableTables}
        setIsSelected={setAvailableTables}
      >
        <Image style={{ width: 80, height: 80 }} source={require('../../assets/chair.png')} />
      </SelectFeature>
    </View>
  );

  const stepperContent = [
    {
      key: 1,
      component: <RenderInitialSelection />,
    },
    {
      key: 2,
      component: (
        <SelectTypes
          text1="Bebidas"
          text2="Selecione os tipos de bebidas que são servidas em seu estabelecimento"
          constant={DRINK_TYPES}
          list={drinkTypeList}
          setList={setDrinkTypeList}
        />
      ),
    },
    {
      key: 3,
      component: (
        <SelectTypes
          text1="Comidas"
          text2="Selecione os tipos de comidas que são servidos em seu estabelecimento"
          constant={FOOD_TYPES}
          list={foodTypeList}
          setList={setFoodTypeList}
        />
      ),
    },
    {
      key: 4,
      component: (
        <SelectTypes
          text1="Ambiente"
          text2="Selecione os tipos de ambientes seus clientes irão encontrar"
          constant={PARTY_TYPES}
          list={partyTypeList}
          setList={setPartyTypeList}
        />
      ),
    },
    {
      key: 5,
      component: (
        <SelectTypes
          text1="Músicas"
          text2="Selecion os estilos músicais que costumam tocar em seu estabelecimento"
          constant={MUSIC_STYLES}
          list={musicStyleList}
          setList={setMusicStyleList}
        />
      ),
    },
  ];

  return (
    <Layout style={{ flex: 1, paddingHorizontal: 20 }}>
      <View>
        <Stepper
          active={activeStepper}
          onFinish={completePartyFeatures}
          onBack={() => setActiveStepper((p) => p - 1)}
          onNext={() => setActiveStepper((p) => p + 1)}
          wrapperStyle={{
            padding: 20,
            height: '100%',
          }}
          content={stepperContent.map((stepper) => stepper.component)}
          buttonStyle={{ paddingHorizontal: 30, borderRadius: 50 }}
        />
      </View>
    </Layout>
  );
}
