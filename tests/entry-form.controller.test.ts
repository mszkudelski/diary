import { EntryFormController } from '../src/app/entry-form.controller';
import MockedFunction = jest.MockedFunction;
import { fillForm, submitForm } from './helpers/form-helpers';
import exp = require('constants');

let instance: EntryFormController;
const entry = {
  title: 'Title',
  content: 'Today was a good day.',
};

let newEntryAdded: MockedFunction<any>;

beforeEach(() => {
  newEntryAdded = jest.fn();
  instance = new EntryFormController(document.body);
  instance.registerNewEntryListener(newEntryAdded);
});

test('should emit submitted entry', () => {
  fillForm(entry, true);

  expect(newEntryAdded).toHaveBeenCalled();
  const functionCallArg = newEntryAdded.mock.calls[0][0];
  expect(functionCallArg.title).toEqual(entry.title);
  expect(functionCallArg.content).toEqual(entry.content);
  expect(functionCallArg.date.toISOString()).toContain(
    new Date().toISOString().split('T')[0],
  );
});

test('should set current date as default title', () => {
  (document.querySelector(
    'textarea[name="content"]',
  ) as HTMLInputElement).value =
    entry.content;

  submitForm();

  expect(newEntryAdded).toHaveBeenCalled();
  const functionCallArg = newEntryAdded.mock.calls[0][0];
  const date = new Date();
  expect(functionCallArg.title).toContain(date.getDate());
  expect(functionCallArg.title).toContain(date.getMonth());
  expect(functionCallArg.title).toContain(date.getFullYear());
});

test('should empty form after successful submit', () => {
  fillForm(entry);
  submitForm();

  expect(
    (document.querySelector('textarea[name="content"]') as HTMLInputElement)
      .value,
  ).toBe('');
  expect(
    (document.querySelector('input[name="title"]') as HTMLInputElement).value,
  ).toBe('');
});

test('should not empty form after failed submit', () => {
  instance.registerNewEntryListener(() => {
    throw new Error();
  });

  fillForm(entry);
  submitForm();

  expect(
    (document.querySelector('textarea[name="content"]') as HTMLInputElement)
      .value,
  ).not.toBe('');
  expect(
    (document.querySelector('input[name="title"]') as HTMLInputElement).value,
  ).not.toBe('');
});
