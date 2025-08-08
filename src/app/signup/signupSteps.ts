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

export const initialSignupSteps: Step[] = [
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
];

export const ThankYouStepComponent = StepThankYou;

export const profileSetupSteps: Step[] = [
  {
    id: 0,
    component: StepGender,
  },
  {
    id: 1,
    component: StepCountry,
  },
  {
    id: 2,
    component: StepPreference,
  },
  {
    id: 3,
    component: StepHeight,
  },
  {
    id: 4,
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
    id: 5,
    component: StepPets,
  },
  {
    id: 6,
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
    id: 7,
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
  id: 8,
  component: OptionStep,
  props: {
    title: 'Do you have or want kids?',
    options: [
      { value: 'i_have', label: 'I have' },
      { value: 'i_want', label: 'I want to' },           // we map to i_want_to in buildPayload
      { value: 'i_do_not_want', label: "I don't want" },   // we map to i_do_not_want in buildPayload
      { value: 'not_sure', label: 'Not sure' },
    ],
    field: 'kids',
  },
},
  {
    id: 9,
    component: OptionStep,
    props: {
      title: 'What are you looking for?',
      options: [
        { value: 'friends', label: 'Make new friends' },
        { value: 'casual', label: 'Something casual' },
        { value: 'relationship', label: 'A serious relationship' },
        { value: 'not_sure', label: "I don't know yet" },
      ],
      field: 'goal',
    },
  },
  {
    id: 10,
    component: StepProfileGallery,
  },
  {
    id: 11,
    component: StepShortBio,
  },
];
