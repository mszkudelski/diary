import { DiaryEntry, DiaryEntrySource } from '../../src/app/diary.model';

export function fillForm(
  newEntry: Pick<DiaryEntrySource, 'title' | 'content'>,
  submit = false,
) {
  (document.querySelector('input[name="title"]') as HTMLInputElement).value =
    newEntry.title;
  (document.querySelector(
    'textarea[name="content"]',
  ) as HTMLInputElement).value =
    newEntry.content;

  if (submit) {
    submitForm();
  }
}

export function submitForm() {
  (document.querySelector(
    'button[type="submit"]',
  ) as HTMLButtonElement).click();
}
