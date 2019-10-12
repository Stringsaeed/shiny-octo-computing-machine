import React from 'react';
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  Subheading,
  TouchableRipple,
} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Col} from 'react-native-easy-grid';

export const FilterPortal = ({
  defaultFilter,
  filters,
  onFiltering,
  visible,
  setVisible,
  setFilter,
}) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}>
        <Dialog.Title>إختار</Dialog.Title>
        <Dialog.ScrollArea style={styles.dialogScrollArea}>
          <ScrollView>
            <View>
              {filters &&
                filters.map(filter => (
                  <TouchableRipple
                    onPress={() => {
                      setFilter(filter._key);
                    }}>
                    <View style={styles.row}>
                      <View pointerEvents="none">
                        <RadioButton
                          value={filter._key}
                          status={
                            defaultFilter === filter._key
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </View>
                      <Col size={33}>
                        <Subheading style={styles.text}>
                          {filter.name}
                        </Subheading>
                      </Col>
                    </View>
                  </TouchableRipple>
                ))}
            </View>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setVisible(false);
            }}>
            إالغاء
          </Button>
          <Button
            onPress={() => {
              setVisible(false);
              onFiltering(defaultFilter);
            }}>
            صفي
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  view: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 2,
    height: 50,
    flexDirection: 'row',
    borderColor: '#d3d3d3',
  },
  col: {
    flex: 1,
    flexDirection: 'row',
  },
  dialogScrollArea: {
    maxHeight: 170,
    paddingHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    paddingLeft: 8,
  },
  textFont: {
    fontFamily: 'NotoKufiArabic-Regular',
  },
  right: {
    marginRight: 5,
  },
});
