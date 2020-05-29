import { EntryFormController } from '../src/app/entry-form.controller';
import MockedFunction = jest.MockedFunction;

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
  (document.querySelector('input[name="title"]') as HTMLInputElement).value =
    entry.title;
  (document.querySelector(
    'textarea[name="content"]',
  ) as HTMLInputElement).value =
    entry.content;

  (document.querySelector(
    'button[type="submit"]',
  ) as HTMLButtonElement).click();

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

  (document.querySelector(
    'button[type="submit"]',
  ) as HTMLButtonElement).click();

  expect(newEntryAdded).toHaveBeenCalled();
  const functionCallArg = newEntryAdded.mock.calls[0][0];
  const date = new Date();
  const expectedTitle = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  expect(functionCallArg.title).toContain(expectedTitle);
});
