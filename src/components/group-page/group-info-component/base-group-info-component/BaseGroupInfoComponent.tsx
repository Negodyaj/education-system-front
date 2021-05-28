import React from 'react';

import '../../../../App.css';
import { BaseInfo, Content, Title } from '../GroupInfoComponentStyled';

import { NextLessons } from './NextLessons';

interface BaseGroupInfoProps {
  courseName?: string;
  startDate?: string;
  duration?: number;
  id: number;
}

function BaseGroupInfoComponent(props: BaseGroupInfoProps) {
  const { courseName, startDate, duration, id } = props;

  return (
    <>
      <BaseInfo>
        <Title>Курс:</Title>
        <Content>{courseName}</Content>
        <Title>Дата начала: </Title>
        <Content>{startDate}</Content>
        <Title>Длительность: </Title>
        <Content>{duration}</Content>
        <Title> Расписание:</Title>
        <Content>Mn Th Fr 9:00</Content>
      </BaseInfo>
      <BaseInfo>
        <NextLessons id={id} />
      </BaseInfo>
    </>
  );
}

export default BaseGroupInfoComponent;
