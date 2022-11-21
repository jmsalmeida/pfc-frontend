import { styles } from './styles';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { Icon, Layout, Text, Button, Divider } from '@ui-kitten/components';
import { CreateFeaturesList } from '../../../components/create-features-list';
import { DRINK_TYPES, FOOD_TYPES, MUSIC_STYLES, PARTY_TYPES } from '../../../constants';

export function AdvancedFilters({
  onClose,
  applyFilters,
  isVisible,
  foodTypeList,
  setFoodTypeList,
  drinkTypeList,
  setDrinkTypeList,
  musicStyleList,
  setMusicStyleList,
  partyTypeList,
  setPartyTypeList,
}) {
  return (
    <Layout
      style={[styles.advancedFiltersModal, { display: isVisible ? 'flex' : 'none' }]}
      disabled={true}
    >
      <View style={styles.advancedFiltersModal.modalHeader}>
        <View style={{ flex: 5 }}>
          <Text category="h4">Filtrar Estabelecimentos</Text>
          <Text category="s2">
            Selecione as caracacteristicas que te agradam para filtrar os locais disponíveis
          </Text>
        </View>

        <TouchableOpacity style={styles.advancedFiltersModal.closeIcon} onPress={() => onClose()}>
          <Icon style={{ width: 25, height: 25 }} name="close-outline" fill="#171717" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.advancedFiltersModal.tagsContent}>
          <Text style={styles.advancedFiltersModal.tagsContent.title} category="h6">
            Bebidas
          </Text>

          <CreateFeaturesList
            featureTypes={DRINK_TYPES}
            list={drinkTypeList}
            setList={setDrinkTypeList}
          />
        </View>

        <Divider />

        <View style={styles.advancedFiltersModal.tagsContent}>
          <Text style={styles.advancedFiltersModal.tagsContent.title} category="h6">
            Comidas
          </Text>

          <CreateFeaturesList
            featureTypes={FOOD_TYPES}
            list={foodTypeList}
            setList={setFoodTypeList}
          />
        </View>

        <Divider />

        <View style={styles.advancedFiltersModal.tagsContent}>
          <Text style={styles.advancedFiltersModal.tagsContent.title} category="h6">
            Músicas
          </Text>

          <CreateFeaturesList
            featureTypes={MUSIC_STYLES}
            list={musicStyleList}
            setList={setMusicStyleList}
          />
        </View>

        <Divider />

        <View style={styles.advancedFiltersModal.tagsContent}>
          <Text style={styles.advancedFiltersModal.tagsContent.title} category="h6">
            Tipo de local
          </Text>

          <CreateFeaturesList
            featureTypes={PARTY_TYPES}
            list={partyTypeList}
            setList={setPartyTypeList}
          />
        </View>

        <Divider />
      </ScrollView>

      <Button onPress={() => applyFilters()}>aplicar filtros</Button>
    </Layout>
  );
}
