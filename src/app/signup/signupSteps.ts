import { FC } from 'react';
import { FormData } from './types'; // <-- make sure this path is right
import StepCredentials from './components/StepCredentials';
import StepPersonalData from './components/StepPersonalData';
import StepDOB from './components/StepDOB';
import StepCountry from './components/StepCountry';
import StepHeight from './components/StepHeight';
import OptionStep from './components/common/OptionStep';
import StepPets from './components/StepPets';
import StepProfileGallery from './components/StepProfileGallery';
import StepShortBio from './components/StepShortBio';
import StepThankYou from './components/StepThankYou';

type OptionProps<K extends keyof FormData> = {
  title: string;
  // value type is tied to the chosen field (no more loose string)
  options: { value: NonNullable<FormData[K]>; label: string }[];
  field: K;
};

type ComponentStep = {
  id: number;
  type?: 'component';
  component: FC<any>;
};

type OptionStepConfig<K extends keyof FormData> = {
  id: number;
  type: 'option';
  component: typeof OptionStep;
  props: OptionProps<K>;
};

export type Step = ComponentStep | OptionStepConfig<keyof FormData>;

export const initialSignupSteps: Step[] = [
  { id: 0, component: StepPersonalData },
  { id: 1, component: StepDOB },
  { id: 2, component: StepCredentials },
];

export const ThankYouStepComponent = StepThankYou;

export const profileSetupSteps: Step[] = [
  {
    id: 0,
    type: 'option',
    component: OptionStep,
    props: {
      title: 'How do you identify?',
      field: 'gender', // <-- now keyof FormData
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'non-binary', label: 'Non-binary' },
        { value: 'other', label: 'Other' },
      ] as const,
    },
  },
  { id: 1, component: StepCountry },
  {
    id: 2,
    type: 'option',
    component: OptionStep,
    props: {
      title: 'Who are you interested in?',
      field: 'preference',
      options: [
        { value: 'women', label: 'Women' },
        { value: 'men', label: 'Men' },
        { value: 'both', label: 'Both' },
        { value: 'not_sure', label: 'Not sure' },
      ] as const,
    },
  },
  { id: 3, component: StepHeight },
  {
    id: 4,
    type: 'option',
    component: OptionStep,
    props: {
      title: 'What are your spiritual beliefs?',
      field: 'religion',
      options: [
        { value: 'atheism', label: 'Atheism' },
        { value: 'buddhism', label: 'Buddhism' },
        { value: 'christianity', label: 'Christianity' },
        { value: 'hinduism', label: 'Hinduism' },
        { value: 'islam', label: 'Islam' },
        { value: 'judaism', label: 'Judaism' },
        { value: 'other', label: 'Other' },
        { value: 'none', label: 'None' },
      ] as const,
    },
  },
  {
    id: 5,
    component: StepPets,
  },
  {
    id: 6,
    type: 'option',
    component: OptionStep,
    props: {
      title: 'Do you smoke?',
      field: 'smoking',
      options: [
        { value: 'regularly', label: 'Regularly' },
        { value: 'when_drink', label: 'When drink' },
        { value: 'sometimes', label: 'Sometimes' },
        { value: 'never', label: 'Never' },
      ] as const,
    },
  },
  {
    id: 7,
    type: 'option',
    component: OptionStep,
    props: {
      title: 'Do you drink?',
      field: 'drinking',
      options: [
        { value: 'often', label: 'Often' },
        { value: 'on_holidays', label: 'On holidays' },
        { value: 'sometimes', label: 'Sometimes' },
        { value: 'never', label: 'Never' },
      ] as const,
    },
  },
  {
    id: 8,
    type: 'option',
    component: OptionStep,
    props: {
      title: 'Do you have or want kids?',
      field: 'kids',
      options: [
        { value: 'i_have', label: 'I have' },
        { value: 'i_want_to', label: 'I want to' },
        { value: 'i_do_not_want', label: "I don't want" },
        { value: 'not_sure', label: 'Not sure' },
      ] as const,
    },
  },
  {
    id: 9,
    type: 'option',
    component: OptionStep,
    props: {
      title: 'What are you looking for?',
      field: 'goal',
      options: [
        { value: 'friends', label: 'Make new friends' },
        { value: 'casual', label: 'Something casual' },
        { value: 'relationship', label: 'A serious relationship' },
        { value: 'not_sure', label: "I don't know yet" },
      ] as const,
    },
  },
  { id: 10, component: StepShortBio },
  { id: 11, component: StepProfileGallery },
];
