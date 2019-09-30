import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Col} from 'react-native-easy-grid';
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  Subheading,
  TouchableRipple,
} from 'react-native-paper';

export const TopBar = props => {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState(props.filter);

  return (
    <View style={styles.view}>
      <Col style={styles.col} size={33}>
        <Button
          icon="filter"
          onPress={() => {
            setVisible(true);
          }}
        />
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
                  <TouchableRipple
                    onPress={() => {
                      setFilter('Today');
                    }}>
                    <View style={styles.row}>
                      <View pointerEvents="none">
                        <RadioButton
                          value="Today"
                          status={filter === 'Today' ? 'checked' : 'unchecked'}
                        />
                      </View>
                      <Col size={33}>
                        <Subheading style={styles.text}>اليوم</Subheading>
                      </Col>
                    </View>
                  </TouchableRipple>
                  <TouchableRipple
                    onPress={() => {
                      setFilter('Current Week');
                    }}>
                    <View style={styles.row}>
                      <View pointerEvents="none">
                        <RadioButton
                          value="Current Week"
                          status={
                            filter === 'Current Week' ? 'checked' : 'unchecked'
                          }
                        />
                      </View>
                      <Col size={33}>
                        <Subheading style={styles.text}>هذا الاسبوع</Subheading>
                      </Col>
                    </View>
                  </TouchableRipple>
                  <TouchableRipple
                    onPress={() => {
                      setFilter('Current Month');
                    }}>
                    <View style={styles.row}>
                      <View pointerEvents="none">
                        <RadioButton
                          value="Current Month"
                          status={
                            filter === 'Current Month' ? 'checked' : 'unchecked'
                          }
                        />
                      </View>
                      <Col size={33}>
                        <Subheading style={styles.text}>هذا الشهر</Subheading>
                      </Col>
                    </View>
                  </TouchableRipple>
                  <TouchableRipple
                    onPress={() => {
                      setFilter('All');
                    }}>
                    <View style={styles.row}>
                      <View pointerEvents="none">
                        <RadioButton
                          value="All"
                          status={filter === 'All' ? 'checked' : 'unchecked'}
                        />
                      </View>
                      <Col size={33}>
                        <Subheading style={styles.text}>الكل</Subheading>
                      </Col>
                    </View>
                  </TouchableRipple>
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
                  console.log(filter);
                  setVisible(false);
                  props.onFiltering(filter);
                }}>
                صفي
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Col>
      <Col size={33} style={styles.right}>
        <Text style={styles.textFont}>لوحة البيانات</Text>
      </Col>
    </View>
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
