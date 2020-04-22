import React, { useState, useMemo } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChangeInput }) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.tron.log(`CURRENT DATE: ${currentDate}`);
    onChangeInput(currentDate);
    setOpened(false);
  };

  function handleDateButton() {
    setOpened(true);
  }

  return (
    <Container>
      <DateButton onPress={handleDateButton}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            minimumDate={new Date()}
            is24Hour
            display="spinner"
            locale="pt"
            mode="date"
            onChange={onChange}
          />
        </Picker>
      )}
    </Container>
  );
}
