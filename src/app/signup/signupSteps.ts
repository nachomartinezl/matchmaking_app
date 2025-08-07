import { FC } from 'react';
import StepCredentials from './components/StepCredentials';
import StepPersonalData from './components/StepPersonalData';
import StepDOB from './components/StepDOB';
import StepGender from './components/StepGender';
import StepCountry from './components/StepCountry';
import StepPreference from './components/StepPreference';
import StepHeight from './components/StepHeight';
import OptionStep from './components/common/OptionStep';
import StepPets from './components/StepPets';
import StepProfileGallery from './components/StepProfileGallery';
import StepShortBio from './components/StepShortBio';
import StepThankYou from './components/StepThankYou';

interface Step {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: FC<any>;
  props?: {
    title: string;
    options: { value: string; label: string }[];
    field: string;
  };
}

export const signupSteps: Step[] = [
  {
    id: 0,
    component: StepPersonalData,
  },
  {
    id: 1,
    component: StepDOB,
  },
  {
    id: 2,
    component: StepCredentials,
  },
  {
    id: 3,
    component: StepThankYou,
  },
  {
    id: 4,
    component: StepGender,
  },
  {
    id: 5,
    component: StepCountry,
  },
  {
    id: 6,
    component: StepPreference,
  },
  {
    id: 7,
    component: StepHeight,
  },
  {
    id: 8,
    component: OptionStep,
    props: {
      title: 'What are your spiritual beliefs?',
      options: [
        { value: 'atheism', label: 'Atheism' },
        { value: 'buddhism', label: 'Buddhism' },
        { value: 'christianity', label: 'Christianity' },
        { value: 'hinduism', label: 'Hinduism' },
        { value: 'islam', label: 'Islam' },
        { value: 'judaism', label: 'Judaism' },
        { value: 'other', label: 'Other' },
        { value: 'none', label: 'None' },
      ],
      field: 'religion',
    },
  },
  {
    id: 9,
    component: StepPets,
  },
  {
    id: 10,
    component: OptionStep,
    props: {
      title: 'Do you smoke?',
      options: [
        { value: 'regularly', label: 'Regularly' },
        { value: 'when_drink', label: 'When drink' },
        { value: 'sometimes', label: 'Sometimes' },
        { value: 'never', label: 'Never' },
      ],
      field: 'smoking',
    },
  },
  {
    id: 11,
    component: OptionStep,
    props: {
      title: 'Do you drink?',
      options: [
        { value: 'often', label: 'Often' },
        { value: 'on_holidays', label: 'On holidays' },
        { value: 'sometimes', label: 'Sometimes' },
        { value: 'never', label: 'Never' },
      ],
      field: 'drinking',
    },
  },
  {
    id: 12,
    component: OptionStep,
    props: {
      title: 'Do you have or want kids?',
      options: [
        { value: 'i_have', label: 'I have' },
        { value: 'i_want', label: 'I want to' },
        { value: 'i_dont_want', label: "I don't want" },
        { value: 'not_sure', label: 'Not sure' },
      ],
      field: 'kids',
    },
  },
  {
    id: 13,
    component: OptionStep,
    props: {
      title: 'What are you looking for?',
      options: [
        { value: 'friends', label: 'Make new friends' },
        { value: 'casual', label: 'Something casual' },
        { value: 'relationship', label: 'A serious relationship' },
        { value: 'dont_know', label: "I don't know yet" },
      ],
      field: 'goal',
    },
  },
  {
    id: 14,
    component: StepProfileGallery,
  },
  {
    id: 15,
    component: StepShortBio,
  },
];
