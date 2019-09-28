import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Col} from 'react-native-easy-grid';
import {
  Button,
  Subheading,
  Portal,
  Dialog,
  RadioButton,
  TouchableRipple,
  IconButton,
} from 'react-native-paper';

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
});

const TopBar = () => {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState('Current Week');

  return (
    <View style={styles.view}>
      <Col style={styles.col}>
        <IconButton
          name="filter-variant"
          type="MaterialCommunityIcons"
          onPress={() => setVisible(!visible)}
        />
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>إختار</Dialog.Title>
            <Dialog.ScrollArea style={styles.dialogScrollArea}>
              <ScrollView>
                <View>
                  <TouchableRipple onPress={() => setFilter('Today')}>
                    <View style={styles.row}>
                      <View pointerEvents="none">
                        <RadioButton
                          value="Today"
                          status={filter === 'Today' ? 'checked' : 'unchecked'}
                        />
                      </View>
                      <Right>
                        <Subheading style={styles.text}>اليوم</Subheading>
                      </Right>
                    </View>
                  </TouchableRipple>
                  <TouchableRipple onPress={() => setFilter('Current Week')}>
                    <View style={styles.row}>
                      <View pointerEvents="none">
                        <RadioButton
                          value="Current Week"
                          status={
                            filter === 'Current Week' ? 'checked' : 'unchecked'
                          }
                        />
                      </View>
                      <Right>
                        <Subheading style={styles.text}>هذا الاسبوع</Subheading>
                      </Right>
                    </View>
                  </TouchableRipple>
                  <TouchableRipple onPress={() => setFilter('Current Month')}>
                    <View style={styles.row}>
                      <View pointerEvents="none">
                        <RadioButton
                          value="Current Month"
                          status={
                            filter === 'Current Month' ? 'checked' : 'unchecked'
                          }
                        />
                      </View>
                      <Right>
                        <Subheading style={styles.text}>هذا الشهر</Subheading>
                      </Right>
                    </View>
                  </TouchableRipple>
                  <TouchableRipple onPress={() => setFilter('All')}>
                    <View style={styles.row}>
                      <View pointerEvents="none">
                        <RadioButton
                          value="ALAllL"
                          status={filter === 'All' ? 'checked' : 'unchecked'}
                        />
                      </View>
                      <Right>
                        <Subheading style={styles.text}>الكل</Subheading>
                      </Right>
                    </View>
                  </TouchableRipple>
                </View>
              </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>إالغاء</Button>
              <Button
                onPress={() => {
                  this._hideDialog();
                  this._onRefresh();
                }}>
                صفي
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Col>
      <Content />
      <Right style={{marginRight: 5}}>
        <Text style={{fontFamily: 'NotoKufiArabic-Regular'}}>
          لوحة البيانات
        </Text>
      </Right>
    </View>
  );
};

export default TopBar;
