import { DiaryController } from '../src/app/diary.controller';
import { Diary, DiaryEntry, DiaryEntrySource } from '../src/app/diary.model';
import { DiaryService } from '../src/app/diary.service';
import { EntryFormController } from '../src/app/entry-form.controller';
import { fillForm } from './helpers/form-helpers';

let controllerInstance: DiaryController;
let formInstance: EntryFormController;

const entry = new DiaryEntry({
  title: 'Title',
  content: 'Today was a good day.',
  date: new Date(),
});

const newEntry = new DiaryEntry({
  title: 'Title 2',
  content: 'Today was such a good day.',
  date: new Date(),
});

let entriesElement: HTMLElement;
let formElement: HTMLElement;

beforeEach(() => {
  new DiaryService().saveDiary(new Diary([entry]));
  document.body.innerHTML = `
        <div class="form" id="form"></div>
        <div class="entries" id="entries"></div>
  `;
  entriesElement = document.querySelector('#entries');
  formElement = document.querySelector('#form');
  controllerInstance = new DiaryController(entriesElement);
  formInstance = new EntryFormController(formElement);
  formInstance.registerNewEntryListener(
    controllerInstance.addEmptyEntry.bind(controllerInstance),
  );
});

test('should render new entry after form submit', () => {
  fillForm(newEntry, true);

  expect(entriesElement.innerHTML.includes(newEntry.title)).toBeTruthy();
  expect(entriesElement.innerHTML.includes(newEntry.content)).toBeTruthy();
});

test('should save new entry as cookie', () => {
  fillForm(newEntry, true);

  expect(document.cookie.includes(newEntry.title)).toBeTruthy();
  expect(document.cookie.includes(newEntry.content)).toBeTruthy();
});

test('should show error if title is duplicated after form submit', () => {
  fillForm(entry, true);

  expect(formElement.querySelector('#error').innerHTML).not.toBe('');
});

test('should not show error before form submit', () => {
  fillForm(entry, false);

  expect(formElement.querySelector('#error').innerHTML).toBe('');
});
