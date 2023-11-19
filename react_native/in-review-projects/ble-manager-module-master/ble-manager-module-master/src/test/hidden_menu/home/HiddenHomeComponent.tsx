import { FlatList, View, Text } from 'react-native';
import TestCategoryGridTile from '../../../presentation/components/hidden/TestCategoryGridTile';
import { TEST_CATEGORY_LIST } from '../../data/TestCases';

const TEST_GUIDE_MESSAGE =
  '[ Guide ]\n\n' +
  'Click on the category of test you would like to do below. ' +
  'You can view test cases by clicking on a category.';
/**
 * component ui that is used in container.
 * @return {JSX.Element}
 */
const HiddenHomeComponent = (props: { onPressTestCategory: any; }): JSX.Element => {
  /**
   * props delivered from HiddenHomeContainer.
   */
  const { onPressTestCategory } = props;

  /**
   * render test category items.
   * @param {any} itemData
   * @return
   */
  function renderTestCategoryItem(itemData: any) {
    function pressHandler() {
      onPressTestCategory(itemData.item.id);
    }

    return (
      <TestCategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <View style={{ backgroundColor: '#adb5bd', flex: 1 }}>
      <Text
        style={{
          color: '#000000',
          fontSize: 18,
          padding: 15,
          fontWeight: '900',
          marginTop: 15,
          marginBottom: 10,
          backgroundColor: '#ffd500',
        }}>
        {TEST_GUIDE_MESSAGE}
      </Text>
      <FlatList
        data={TEST_CATEGORY_LIST}
        keyExtractor={item => item.id}
        renderItem={renderTestCategoryItem}
        numColumns={2}
      />
    </View>
  );
};

export default HiddenHomeComponent;
